import { Col, Container, Row } from "react-bootstrap";
import Product from "../shared/product";
import { useEffect, useState } from "react";
import axios_instance from "../../util/axios_instance";
import URL from "../../util/url";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  // get data featured product
  const get_featured = async () => {
    const url = URL.FEATURED_PRODUCT;
    const rs = await axios_instance.get(url);
    const data = rs.data.data;
    setFeaturedProducts(data);
  };
  // get data latest product
  const get_latest = async () => {
    const url = URL.LATEST_PRODUCT;
    const rs = await axios_instance.get(url);
    const data = rs.data.data;
    setLatestProducts(data);
  };
  useEffect(() => {
    get_featured();
    get_latest();
  }, []);
  return (
    <Container>
      <h2>Featured Products</h2>
      <Row>
        {featuredProducts.map((e, k) => {
          return (
            <Col xs={3} key={k}>
              <Product product={e} />
            </Col>
          );
        })}
      </Row>
      <h2>Latest Products</h2>
      <Row>
        {latestProducts.map((e, k) => {
          return (
            <Col xs={3} key={k}>
              <Product product={e} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Home;
