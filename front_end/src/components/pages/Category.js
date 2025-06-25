import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios_instance from "../../util/axios_instance";
import { Container, Row, Col } from "react-bootstrap"; // Import Row and Col
import Product from "../shared/product"; // Import Product component

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  //lay san pham theo danh muc
  const get_products = async () => {
    const url = `/category_products.php?category_id=${id}`;
    const response = await axios_instance.get(url);
    const data = response.data.data;
    setProducts(data);
  };
  useEffect(() => {
    get_products();
  }, [id]);
  return (
    <Container>
      <h1>Products in Category {id}:</h1>
      <Row className="g-4">
        {products.map((e, k) => {
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={k} className="d-flex">
              <Product product={e} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Category;
