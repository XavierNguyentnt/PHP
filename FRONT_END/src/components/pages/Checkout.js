import { useContext, useState } from "react";
import UserContext from "../../context/context";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { data, Link } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios_instance from "../../util/axios_instance";
import URL from "../../util/url";

const Checkout = () => {
  const options = {
    clientId:
      "AT4E9IB2vgxdsijJPafKedX-ouYG_io2swXTVM-ssc5Cm4X7YKgN9pkpbRUlznDaG6kNg6BFpstxdXyO",
    currency: "USD",
    intent: "capture",
  };
  const { state, dispatch } = useContext(UserContext);
  const [order, setOrder] = useState({
    id: null,
    name: "",
    telephone: "",
    address: "",
    cart: state.cart,
  });
  const create_order = async (value, actions) => {
    // call api create order
    const rs = await axios_instance.post(URL.CREATE_ORDER, { order: order });
    const data = rs.data.data; // order_id. grand_total
    setOrder({ ...order, id: data.order_id, grand_total: data.grand_total });

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: data.grand_total,
          },
        },
      ],
    });
  };
  const on_approve = async (data, actions) => {
    const rs = await axios_instance.get(URL.UPDATE_ORDER, {
      params: { order_id: order.id },
    });
    return actions.order.capture().then(function (details) {
      // details.id should contain the order ID
      dispatch({ type: "UPDATE_CART", payload: [] });
      // Handle successful capture, e.g., update your database
    });
  };
  const inputHanle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
    //    let k = e.target.name;
    //    let v = e.target.value;
    //    let o = order;
    //    o[k] = v;
    //    setOrder(o);
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
              onChange={inputHanle}
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
              onChange={inputHanle}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={order.address}
              onChange={inputHanle}
              className="form-control"></textarea>
          </div>
        </Col>
        <Col>
          <h2>Cart sumary</h2>
          <Table hover={true} striped={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Buy Qty</th>
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
                  <PayPalScriptProvider options={options}>
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
