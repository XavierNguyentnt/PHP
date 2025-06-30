import { useContext } from "react";
import UserContext from "../../context/context";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { state, dispatch } = useContext(UserContext);
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
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Telephone</label>
            <input type="tel" name="telephone" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea name="address" className="form-control"></textarea>
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
                  <Link to={"/checkout"} className="btn btn-primary">
                    Checkout
                  </Link>
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
