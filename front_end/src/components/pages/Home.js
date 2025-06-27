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
    try {
      const url = URL.FEATURED_PRODUCT; // Replace with actual URL
      const rs = await axios_instance.get(url);
      const data = rs.data.data;
      setFeaturedProducts(data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };
  // get data latest product
  const get_latest = async () => {
    try {
      const url = URL.LATEST_PRODUCT; // Replace with actual URLp";
      const rs = await axios_instance.get(url);
      const data = rs.data.data;
      setLatestProducts(data);
    } catch (error) {
      console.error("Error fetching latest products:", error);
    }
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
