import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card">
      <img src={product.thumbnail} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <Link to={"/detail/" + product.id} className="btn btn-primary">
          Detail
        </Link>
      </div>
    </div>
  );
};
export default Product;
