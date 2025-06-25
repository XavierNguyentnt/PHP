import { Col, Container, Row } from "react-bootstrap";
import Product from "../shared/product";

const Home = () => {
  return (
    <Container>
      <h2>Featured Products</h2>
      <Row>
        <Col xs={3}>
          <Product />
        </Col>
      </Row>
      <h2>Latest Products</h2>
      <Row>
        <Col xs={3}>
          <Product />
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
