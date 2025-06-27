import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios_instance from "../../util/axios_instance";
import UserContext from "../../context/context";
import { useContext } from "react";
import { Badge } from "react-bootstrap";
import URL from "../../util/url";

const Menu = () => {
  const { state, dispatch } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const get_menu = async () => {
    try {
      const url = URL.CATEGORIES;
      const rs = await axios_instance.get(url);
      setCategories(rs.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    get_menu();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {categories.map((e, k) => {
              return (
                <li key={e.id} className="nav-item">
                  <Link className="nav-link" to={"/category/" + e.id}>
                    {e.name}
                  </Link>
                </li>
              );
            })}

            <li className="nav-item">
              <Link className="nav-link" to={"/cart"}>
                Cart <Badge bg="secondary">{state.cart.length}</Badge>
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <Link
            to="/cart"
            className="nav-link ms-3 position-relative"
            aria-label={`View shopping cart with ${state.cart.length} items`}>
            <i className="bi-cart-plus-fill" style={{ fontSize: "1.5rem" }}></i>{" "}
            {state.cart.length > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.75em" }}>
                {state.cart.length}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Menu;
