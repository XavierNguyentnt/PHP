import { useContext, useState, useEffect } from "react";
import { Button, Container, Table, Image, Form } from "react-bootstrap";
import UserContext from "../../context/context";
import { Link } from "react-router-dom";
import axios_instance from "../../util/axios_instance"; // Đảm bảo bạn có import này
import URL from "../../util/url"; // Đảm bảo bạn có import này

const Cart = () => {
  const { state, dispatch } = useContext(UserContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);

  //Cập nhật tổng tiền các mặt hàng được chọn
  useEffect(() => {
    let total = 0;
    state.cart.forEach((item) => {
      if (selectedItems.includes(item.id)) {
        total += item.price * item.buyQty; // Sử dụng item.buyQty
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
        quantity: item.buyQty, // Sử dụng item.buyQty
        price: item.price,
      })),
      total_amount: totalSelectedPrice,
      // user_id: state.user?.id, // Nếu bạn có thông tin user trong context
    };

    try {
      const response = await axios_instance.post(URL.CREATE_ORDER, orderData);
      console.log("Order created successfully:", response.data);

      if (response.data.success) {
        alert("Đơn hàng đã được tạo thành công!");
        // Cập nhật giỏ hàng: xóa các sản phẩm đã mua
        const remainingCartItems = state.cart.filter(
          (item) => !selectedItems.includes(item.id)
        );
        dispatch({ type: "UPDATE_CART", payload: remainingCartItems }); // Đảm bảo type khớp với reducer của bạn
        setSelectedItems([]); // Xóa các mặt hàng đã chọn
        // Có thể chuyển hướng người dùng ở đây nếu muốn
        // navigate('/order-confirmation/' + response.data.order_id);
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
                <th>Select</th> {/* THÊM CỘT CHỌN */}
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
                    <Form.Check // THÊM CHECKBOX VÀO ĐÂY
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
                      max={item.qty} // Giới hạn số lượng mua không quá số lượng tồn kho (qty)
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
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end">
                  {/* Điều chỉnh colSpan do đã thêm cột Select */}
                  <strong>Total Cart Price</strong> {/* Đổi tên cho rõ ràng */}
                </td>
                <td>
                  <strong>${calculateTotalCartPrice()}</strong>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
          {/* THÊM DÒNG TỔNG TIỀN CỦA MẶT HÀNG ĐÃ CHỌN VÀ NÚT MUA HÀNG */}
          <div className="d-flex justify-content-end align-items-center mt-4">
            <Link to={"/checkout"} className="btn btn-primary">
              Purchase Selected Items
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
