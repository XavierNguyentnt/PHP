import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios_instance from "../../util/axios_instance";
import { Container, Row, Col } from "react-bootstrap";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const get_detail = async () => {
      const url = `/detail_products.php?id=${id}`;
      const response = await axios_instance.get(url);
      const data = response.data.data;
      setProduct(data);
    };
    get_detail();
  }, [id]);

  // const [loading, setLoading] = useState(true); // Thêm state loading
  // const [error, setError] = useState(null); // Thêm state error

  // Hàm lấy chi tiết sản phẩm
  // const fetchProductDetails = async () => {
  //   setLoading(true); // Bắt đầu tải, đặt loading = true
  //   setError(null); // Xóa lỗi cũ (nếu có)

  //   try {
  //     const url = `/detail_products.php?id=${id}`;
  //     const response = await axios_instance.get(url);
  //     const data = response.data.data;

  //     if (data) {
  //       // Nếu API trả về một đối tượng, đặt nó vào một mảng
  //       // Nếu API trả về một mảng, nó vẫn hoạt động đúng
  //       setProduct(Array.isArray(data) ? data[0] : data);
  //     } else {
  //       setProduct(null); // Không tìm thấy sản phẩm
  //       setError("Không tìm thấy sản phẩm với ID này.");
  //     }
  //   } catch (err) {
  //     console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
  //     setError("Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.");
  //   } finally {
  //     setLoading(false); // Kết thúc tải, đặt loading = false
  //   }
  // };

  // useEffect(() => {
  //   if (id) {
  //     // Đảm bảo có ID trước khi fetch
  //     fetchProductDetails();
  //   } else {
  //     setLoading(false);
  //     setError("ID sản phẩm không hợp lệ.");
  //   }
  // }, [id]);

  // if (loading) {
  //   return (
  //     <Container className="text-center my-5">
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //       <p>Loading Product Details...</p>
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container className="text-center my-5">
  //       <div className="alert alert-danger" role="alert">
  //         {error}
  //       </div>
  //     </Container>
  //   );
  // }

  // if (!product) {
  //   return (
  //     <Container className="text-center my-5">
  //       <div className="alert alert-warning" role="alert">
  //         Can not find product: {product.name} with id: {id}.
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container className="my-5">
      <Row>
        <Col xs={6}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className="img-fluid mb-3"
          />
        </Col>
        <Col xs={6}>
          <h1>{product.name}</h1>
          <p>{product.price} $</p>
          <p>{product.description}</p>
          <div className="input-group mb-3">
            <input
              type="number"
              min={1}
              max={product.qty}
              className="form-control"
            />
            <button className="btn btn-primary" type="button">
              Add to Cart
            </button>
          </div>
          <p>
            <i>Số lượng còn lại trong kho: {product.qty}</i>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
