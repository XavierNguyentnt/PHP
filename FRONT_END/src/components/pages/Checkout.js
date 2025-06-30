import { useContext, useState } from "react";
import UserContext from "../../context/context";
import { Col, Container, Row, Table } from "react-bootstrap";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios_instance from "../../util/axios_instance";

const Checkout = () => {
  const { state, dispatch } = useContext(UserContext);
  const { order, setOrder } = useState({
    id: null,
    name: "",
    telephone: "",
    address: "",
    cart: state.cart,
  });
  const create_order = async () => {
    //call API to create order

    const rs = await axios_instance.post(URL.CREATE_ORDER, order);
    const id = rs.data.data;
    setOrder({ ...order, id: id });
  };
  const on_approve = async () => {
    const rs = await axios_instance.post(URL.UPDATE_ORDER, {
      id: order.id,
    });
    if (rs.data.success) {
      alert("Order created successfully!");
      // Clear the cart after successful order creation
      dispatch({ type: "CLEAR_CART" });
      // Redirect to a success page or home page
      window.location.href = "/";
    } else {
      alert("Failed to create order. Please try again.");
    }
  };

  const inputHandle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  return (
    <Container className="text-start">
      <Row>
        <Col xs={6}>
          <h2>Customer infomation</h2>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={order.name}
              onChange={inputHandle}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Telephone</label>
            <input
              type="tel"
              name="telephone"
              value={order.telephone}
              onChange={inputHandle}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={order.address}
              onChange={inputHandle}
              className="form-control"
            ></textarea>
          </div>
        </Col>
        <Col>
          <h2>Cart sumary</h2>
          <Table hover={true} striped={true}>
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
              {state.cart.map((e, k) => {
                return (
                  <tr key={k}>
                    <td>#{k + 1}</td>
                    <td>
                      <img src={e.thumbnail} width={80} />
                    </td>
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.buyQty}</td>
                    <td>{e.buyQty * e.price}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-end" colSpan={6}>
                  <PayPalScriptProvider options={{ clientId: "test" }}>
                    <PayPalButtons
                      createOrder={create_order}
                      onApprove={on_approve}
                      style={{ layout: "horizontal" }}
                    />
                  </PayPalScriptProvider>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Checkout;
