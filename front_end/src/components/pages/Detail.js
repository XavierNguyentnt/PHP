import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios_instance from "../../util/axios_instance";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Link,
} from "react-bootstrap"; // Import Spinner
import Product from "../shared/product";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Thay đổi thành product (số ít)
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [error, setError] = useState(null); // Thêm state error

  // Hàm lấy chi tiết sản phẩm
  const fetchProductDetails = async () => {
    setLoading(true); // Bắt đầu tải, đặt loading = true
    setError(null); // Xóa lỗi cũ (nếu có)

    try {
      const url = `/detail_products.php?id=${id}`;
      const response = await axios_instance.get(url);
      const data = response.data.data;

      if (data) {
        // Nếu API trả về một đối tượng, đặt nó vào một mảng
        // Nếu API trả về một mảng, nó vẫn hoạt động đúng
        setProduct(Array.isArray(data) ? data[0] : data);
      } else {
        setProduct(null); // Không tìm thấy sản phẩm
        setError("Không tìm thấy sản phẩm với ID này.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      setError("Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Kết thúc tải, đặt loading = false
    }
  };

  useEffect(() => {
    if (id) {
      // Đảm bảo có ID trước khi fetch
      fetchProductDetails();
    } else {
      setLoading(false);
      setError("ID sản phẩm không hợp lệ.");
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Product Details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <div className="alert alert-warning" role="alert">
          Can not find product: {product.name} with id: {id}.
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {" "}
          {/* Điều chỉnh kích thước cột cho trang chi tiết */}
          <Card>
            <Row className="g-0">
              <Col md={5}>
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  alt={product.name}
                  className="img-fluid rounded-start"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </Col>
              <Col md={7}>
                <Card.Body>
                  <Card.Title as="h2">{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> {product.price} $
                  </Card.Text>
                  <Card.Text>
                    <strong>Description:</strong>{" "}
                    {product.description || "Không có Description chi tiết."}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/cart/${product.id}`}
                    variant="primary"
                    className="w-100 mt-3"
                  >
                    Add to Cart
                  </Button>{" "}
                  <Button variant="success" className="w-100 mt-2">
                    Buy Now
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
