import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_instance from "./../../util/axios_instance";
import { Col, Container, Row } from "react-bootstrap";
import UserContext from "../../context/context";
import { type } from "@testing-library/user-event/dist/type";
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [buyQty, setBuyQty] = useState(1);
  const get_detail = async () => {
    try {
      const url = "/detail_product.php?id=" + id;
      const rs = await axios_instance.get(url);
      const data = rs.data.data;
      setProduct(data);
    } catch (error) {
      console.error(`Error fetching product detail for id ${id}:`, error);
    }
  };
  useEffect(() => {
    get_detail();
  }, [id]);
  const inputHandle = (e) => {
    const v =
      e.target.value > 0 && e.target.value <= product.qty
        ? e.target.value
        : product.qty;
    setBuyQty(v);
  };
  // gọi đến context để nạp sản phẩm vào giỏ
  const { state, dispatch } = useContext(UserContext);
  const add_to_cart = () => {
    product.buyQty = buyQty; // set số lượng cần mua vào chính sản phẩm
    const cart = state.cart;
    cart.push(product);

    dispatch({
      type: "UPDATE_CART",
      payload: cart,
    });
  };
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <img src={product.thumbnail} className="w-100 img-thumbnail" />
        </Col>
        <Col xs={6} className="text-start">
          <h1>{product.name}</h1>
          <p>${product.price}</p>
          <p>{product.description}</p>

          <div className="input-group mb-3 w-50">
            <input
              type="number"
              onChange={inputHandle}
              value={buyQty}
              min={1}
              max={product.qty}
              className="form-control"
            />
            <button
              onClick={add_to_cart}
              class="btn btn-outline-primary"
              type="button"
            >
              Add to cart
            </button>
          </div>
          <p>
            <i>Số lượng còn trong kho: {product.qty}</i>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default Detail;
