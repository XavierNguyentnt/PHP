import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_instance from "./../../util/axios_instance";
import { Col, Container, Row } from "react-bootstrap";
import UserContext from "../../context/context";
import URL from "../../util/url";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [buyQty, setBuyQty] = useState(1);
  const get_detail = async () => {
    try {
      const url = URL.DETAIL_PRODUCT + id;
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
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > product.qty) {
      value = product.qty;
    }
    setBuyQty(value);
  };
  // gọi đến context để nạp sản phẩm vào giỏ
  const { state, dispatch } = useContext(UserContext);
  const add_to_cart = () => {
    const existingProductIndex = state.cart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart;
    if (existingProductIndex > -1) {
      // Product exists, update quantity
      updatedCart = state.cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, buyQty: item.buyQty + buyQty }
          : item
      );
    } else {
      // Product does not exist, add it to the cart
      updatedCart = [...state.cart, { ...product, buyQty: buyQty }];
    }

    dispatch({
      type: "UPDATE_CART",
      payload: updatedCart,
    });
  };
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <img
            src={product.thumbnail}
            alt={product.name || "Product image"}
            className="w-100 img-thumbnail"
          />
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
              className="btn btn-outline-primary"
              type="button">
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
