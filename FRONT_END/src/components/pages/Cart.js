import { useContext, useState, useEffect } from "react";
import { Button, Container, Table, Image, Form } from "react-bootstrap";
import UserContext from "../../context/context";
import { Link, useNavigate } from "react-router-dom"; // THÊM useNavigate
import axios_instance from "../../util/axios_instance";
import URL from "../../util/url";

const Cart = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate(); // KHỞI TẠO useNavigate

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);

  // Cập nhật tổng tiền các mặt hàng được chọn
  useEffect(() => {
    let total = 0;
    state.cart.forEach((item) => {
      if (selectedItems.includes(item.id)) {
        total += item.price * item.buyQty;
      }
    });
    setTotalSelectedPrice(total);
  }, [selectedItems, state.cart]);

  const handleCheckboxChange = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  const handlePurchase = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một mặt hàng để mua.");
      return;
    }

    const itemsToPurchase = state.cart.filter((item) =>
      selectedItems.includes(item.id)
    );

    const orderData = {
      items: itemsToPurchase.map((item) => ({
        product_id: item.id,
        quantity: item.buyQty,
        price: item.price,
      })),
      total_amount: totalSelectedPrice,
      // user_id: state.user?.id, // Nếu bạn có thông tin user trong context
    };

    try {
      const response = await axios_instance.post(URL.CREATE_ORDER, orderData);
      console.log("Order creation response:", response.data);

      if (response.data.success) {
        alert(
          "Đơn hàng đã được tạo thành công! Chuyển hướng đến trang thanh toán."
        );

        // Cập nhật giỏ hàng: xóa các sản phẩm đã mua
        const remainingCartItems = state.cart.filter(
          (item) => !selectedItems.includes(item.id)
        );
        dispatch({ type: "UPDATE_CART", payload: remainingCartItems });
        setSelectedItems([]); // Xóa các mặt hàng đã chọn
        setTotalSelectedPrice(0); // Reset tổng tiền đã chọn

        // CHUYỂN HƯỚNG SANG TRANG CHECKOUT CHỈ KHI API THÀNH CÔNG
        // Truyền orderData và orderId nếu backend trả về
        navigate("/checkout", {
          state: { orderId: response.data.data, orderData: orderData },
        });
      } else {
        alert("Có lỗi xảy ra khi tạo đơn hàng: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Đã xảy ra lỗi khi xử lý đơn hàng. Vui lòng thử lại.");
    }
  };

  const handleRemove = (productId) => {
    const updatedCart = state.cart.filter((item) => item.id !== productId);
    dispatch({
      type: "UPDATE_CART",
      payload: updatedCart,
    });
    // Đảm bảo bỏ chọn sản phẩm đó nếu nó đang được chọn khi bị xóa khỏi giỏ hàng
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((id) => id !== productId)
    );
  };

  const handleQuantityChange = (productId, newQty) => {
    const updatedCart = state.cart.map((item) => {
      if (item.id === productId) {
        const quantity = Math.max(1, Math.min(newQty, item.qty));
        return { ...item, buyQty: quantity };
      }
      return item;
    });
    dispatch({
      type: "UPDATE_CART",
      payload: updatedCart,
    });
  };

  const calculateTotalCartPrice = () => {
    return state.cart
      .reduce((total, item) => total + item.price * item.buyQty, 0)
      .toFixed(2);
  };

  return (
    <Container className="my-4">
      <h2>Your Shopping Cart</h2>
      {state.cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go shopping!</Link>
        </p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Select</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td>
                    <Image src={item.thumbnail} thumbnail width="100" />{" "}
                    {item.name}
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.buyQty}
                      min="1"
                      max={item.qty}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="form-control"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>${(item.price * item.buyQty).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end">
                  <strong>Total Cart Price</strong>
                </td>
                <td>
                  <strong>${calculateTotalCartPrice()}</strong>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
          <div className="d-flex justify-content-end align-items-center mt-4">
            <h4 className="me-3">
              Total Selected Items Price: ${totalSelectedPrice.toFixed(2)}
            </h4>
            {/* THAY THẾ LINK BẰNG BUTTON VÀ GỌI HANDLEPURCHASE TRỰC TIẾP */}
            <Button
              variant="success"
              onClick={handlePurchase}
              disabled={selectedItems.length === 0}>
              Purchase Selected Items
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
