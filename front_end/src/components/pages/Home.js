import { Col, Container, Row } from "react-bootstrap";
import Product from "../shared/product";
import { useEffect, useState } from "react";
import axios_instance from "../../util/axios_instance";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  //get data featured products
  const get_featured = async () => {
    const url = "/featured_products.php";
    const response = await axios_instance.get(url);
    const data = response.data.data;
    setFeaturedProducts(data);
  };
  //get data latest products
  const get_latest = async () => {
    const url = "/latest_products.php";
    const response = await axios_instance.get(url);
    const data = response.data.data;
    setLatestProducts(data);
  };

  useEffect(() => {
    get_featured();
    get_latest();
  }, []);

  return (
    <Container>
      <h2>Featured Products</h2>
      <Row className="g-4">
        {featuredProducts.map((e, k) => {
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={k} className="d-flex">
              <Product product={e} />
            </Col>
          );
        })}
      </Row>
      <h2 className="mt-5">Latest Products</h2>
      <Row className="g-4">
        {latestProducts.map((e, k) => {
          return (
            <Col xs={3} sm={6} md={4} lg={3} key={k} className="d-flex">
              <Product product={e} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Home;
