import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"; // Import Button component

const Product = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <Card className="mb-3 h-100">
      {" "}
      <Link to={`/detail/${product.id}`}>
        {" "}
        <Card.Img variant="top" src={product.thumbnail} alt={product.name} />
      </Link>
      <Card.Body className="d-flex flex-column">
        {" "}
        <Card.Title>
          <Link
            to={`/detail/${product.id}`}
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
        </Card.Title>
        <Card.Text>{product.price} $</Card.Text>
        <Link to={`/detail/${product.id}`} className="mt-auto">
          Detail
        </Link>{" "}
      </Card.Body>
    </Card>
  );
};
export default Product;
