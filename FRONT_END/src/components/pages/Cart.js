import { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import UserContext from "../../context/context";
import { Link } from "react-router-dom";
const Cart = () => {
  const { state, dispatch } = useContext(UserContext);
  return (
    <Container>
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
    </Container>
  );
};
export default Cart;
