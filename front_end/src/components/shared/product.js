import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div class="card">
      <img src={product.thumbnail} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{product.name}</h5>
        <p class="card-text">${product.price}</p>
        <Link to={"/detail/" + product.id} class="btn btn-primary">
          Detail
        </Link>
      </div>
    </div>
  );
};
export default Product;
