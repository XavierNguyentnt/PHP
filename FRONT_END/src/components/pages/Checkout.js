import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/context";
import { Col, Container, Row, Table, Image } from "react-bootstrap";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios_instance from "../../util/axios_instance";
import URL from "../../util/url"; // Đảm bảo bạn có file URL.js với các endpoint
import { useLocation, useNavigate, Link } from "react-router-dom"; // THÊM Link để quay lại giỏ hàng

const Checkout = () => {
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation(); // Hook để truy cập state từ navigate
  const navigate = useNavigate(); // Hook để điều hướng

  // Lấy dữ liệu đơn hàng đã được tạo từ Cart.js
  // Nếu không có, gán mặc định để tránh lỗi
  const { orderId: initialOrderId, orderData: initialOrderData } =
    location.state || {};

  // State để lưu thông tin đơn hàng hiện tại (chỉ những mục đã chọn)
  // Đảm bảo items là một mảng và total_amount là một số
  const [currentOrder, setCurrentOrder] = useState(
    initialOrderData || { items: [], total_amount: 0 }
  );

  // State cho thông tin khách hàng nhập vào form
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    telephone: "",
    address: "",
  });

  // Sử dụng useEffect để cập nhật currentOrder nếu initialOrderData thay đổi
  // hoặc để tính toán lại tổng tiền nếu có lỗi trong dữ liệu ban đầu
  useEffect(() => {
    if (initialOrderData && initialOrderData.items) {
      // Đảm bảo price được parse thành số ngay khi nhận dữ liệu
      const parsedItems = initialOrderData.items.map((item) => ({
        ...item,
        price: parseFloat(item.price), // CHUYỂN ĐỔI PRICE SANG SỐ
        quantity: parseInt(item.quantity) || 0, // Đảm bảo quantity cũng là số
      }));
      const calculatedTotal = parsedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCurrentOrder({
        ...initialOrderData,
        items: parsedItems,
        total_amount: calculatedTotal, // Cập nhật lại total_amount nếu cần
      });
    } else {
      // Xử lý trường hợp không có dữ liệu đơn hàng được truyền (người dùng truy cập trực tiếp)
      // Có thể chuyển hướng hoặc hiển thị thông báo lỗi
      console.warn("No order data passed to checkout. Redirecting to cart.");
      navigate("/cart"); // Chuyển hướng về trang giỏ hàng
    }
  }, [initialOrderData, navigate]);

  // Hàm xử lý thay đổi trên các input của thông tin khách hàng
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Hàm tạo order cho PayPal (được gọi bởi PayPalButtons createOrder prop)
  const create_paypal_order = async (data, actions) => {
    // Đảm bảo thông tin khách hàng đã được điền đầy đủ
    if (
      !customerInfo.name ||
      !customerInfo.telephone ||
      !customerInfo.address
    ) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng.");
      return Promise.reject(new Error("Missing customer information"));
    }

    if (
      !currentOrder ||
      !currentOrder.items ||
      currentOrder.items.length === 0
    ) {
      alert("Không có mặt hàng nào để thanh toán. Vui lòng quay lại giỏ hàng.");
      return Promise.reject(new Error("No items to checkout"));
    }

    try {
      // Gửi thông tin đơn hàng và thông tin khách hàng đến backend của bạn
      // Backend sẽ gọi PayPal API để tạo một order và trả về PayPal Order ID
      const response = await axios_instance.post(
        URL.PAYPAL_CREATE_ORDER_API_ENDPOINT,
        {
          ...currentOrder, // Chứa items và total_amount đã được parse số
          customer_info: customerInfo, // Thông tin khách hàng
          initial_order_id: initialOrderId, // Order ID từ DB của bạn (nếu có)
        }
      );

      if (response.data.paypal_order_id) {
        console.log("PayPal Order ID received:", response.data.paypal_order_id);
        return response.data.paypal_order_id; // Trả về PayPal Order ID
      } else {
        throw new Error(
          response.data.message || "Failed to get PayPal order ID."
        );
      }
    } catch (error) {
      console.error("Error creating PayPal order on backend:", error);
      alert("Đã xảy ra lỗi khi chuẩn bị thanh toán PayPal. Vui lòng thử lại.");
      return Promise.reject(error);
    }
  };

  // Hàm được gọi khi người dùng phê duyệt thanh toán trên PayPal
  const on_paypal_approve = async (data, actions) => {
    // Backend của bạn sẽ nhận PayPal order ID và gọi PayPal API để capture thanh toán.
    // Sau đó, backend sẽ cập nhật trạng thái đơn hàng trong database của bạn.
    try {
      const response = await axios_instance.post(
        URL.PAYPAL_CAPTURE_ORDER_API_ENDPOINT,
        {
          paypal_order_id: data.orderID, // Order ID từ PayPal
          initial_order_id: initialOrderId, // Order ID từ DB của bạn để cập nhật trạng thái
        }
      );

      if (response.data.success) {
        alert("Thanh toán thành công! Đơn hàng của bạn đã được xác nhận.");
        dispatch({ type: "CLEAR_CART" }); // Xóa toàn bộ giỏ hàng
        navigate("/order-confirmation", {
          state: {
            orderStatus: "success",
            paypalOrderId: data.orderID,
            initialOrderId: initialOrderId,
          },
        });
      } else {
        alert(
          "Xác nhận thanh toán thất bại: " +
            (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error capturing PayPal order on backend:", error);
      alert("Đã xảy ra lỗi khi xác nhận thanh toán. Vui lòng liên hệ hỗ trợ.");
    }
  };

  const on_paypal_cancel = (data) => {
    console.log("Payment cancelled:", data);
    alert("Thanh toán đã bị hủy bởi người dùng.");
  };

  const on_paypal_error = (err) => {
    console.error("PayPal Error:", err);
    alert("Đã xảy ra lỗi với PayPal. Vui lòng kiểm tra console hoặc thử lại.");
  };

  // Nếu không có currentOrder hợp lệ (sau khi useEffect xử lý)
  if (!currentOrder || !currentOrder.items || currentOrder.items.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Checkout</h2>
        <p>
          Không có đơn hàng nào để thanh toán. Vui lòng quay lại giỏ hàng và
          chọn sản phẩm để mua.
        </p>
        <Link to="/cart" className="btn btn-primary">
          Quay lại Giỏ hàng
        </Link>
      </Container>
    );
  }

  return (
    <Container className="text-start my-5">
      <Row>
        <Col xs={12} md={6}>
          {" "}
          {/* Sử dụng md={6} để responsive tốt hơn */}
          <h2>Customer information</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="nameInput" // Đảm bảo id khớp với htmlFor
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                className="form-control"
                required // Đánh dấu là trường bắt buộc
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telephoneInput" className="form-label">
                Telephone
              </label>
              <input
                type="tel"
                name="telephone"
                id="telephoneInput" // Đảm bảo id khớp với htmlFor
                value={customerInfo.telephone}
                onChange={handleCustomerInfoChange}
                className="form-control"
                required // Đánh dấu là trường bắt buộc
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addressTextarea" className="form-label">
                Address
              </label>
              <textarea
                name="address"
                id="addressTextarea" // Đảm bảo id khớp với htmlFor
                rows="3" // Thêm số hàng cho textarea
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                className="form-control"
                required // Đánh dấu là trường bắt buộc
              ></textarea>
            </div>
          </form>
        </Col>
        <Col xs={12} md={6}>
          {" "}
          {/* Sử dụng md={6} để responsive tốt hơn */}
          <h2>Order Summary</h2>
          <Table hover={true} striped={true} responsive>
            {" "}
            {/* Thêm responsive */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentOrder.items.map((item, k) => {
                // Đảm bảo item.price và item.quantity là số trước khi tính toán
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity) || 0; // Đề phòng quantity là NaN

                return (
                  <tr key={item.product_id || k}>
                    <td>#{k + 1}</td>
                    <td>
                      <Image src={item.thumbnail} width={80} thumbnail />
                    </td>
                    <td>{item.name}</td>
                    <td>${price.toFixed(2)}</td>{" "}
                    {/* Đã dùng toFixed sau khi parse */}
                    <td>{quantity}</td>
                    <td>${(price * quantity).toFixed(2)}</td>{" "}
                    {/* Đã dùng toFixed sau khi parse */}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="text-end">
                  <strong>Total Payment</strong>
                </td>
                <td>
                  {/* Đảm bảo total_amount là số và dùng toFixed */}
                  <strong>
                    ${parseFloat(currentOrder.total_amount).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </Table>
          {/* PayPal Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <PayPalScriptProvider
              options={{
                clientId:
                  "AT4E9IB2vgxdsijJPafKedX-ouYG_io2swXTVM-ssc5Cm4X7YKgN9pkpbRUlznDaG6kNg6BFpstxdXyO", // Client ID của bạn
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                createOrder={create_paypal_order}
                onApprove={on_paypal_approve}
                onCancel={on_paypal_cancel}
                onError={on_paypal_error}
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "paypal",
                }}
              />
            </PayPalScriptProvider>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Checkout;
