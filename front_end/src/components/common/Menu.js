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
      <div className="container-fluid">
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
          {/* Nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1 justify-content-start">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {categories.map((e) => {
              return (
                <li key={e.id} className="nav-item">
                  <Link className="nav-link" to={"/category/" + e.id}>
                    {e.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Search Box */}
          <form
            className="d-flex flex-grow-1 mx-lg-5 my-2 my-lg-0"
            role="search">
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

          {/* Cart Icon */}
          <div className="d-flex justify-content-end align-items-center flex-grow-1">
            <Link
              to="/cart"
              className="nav-link position-relative"
              aria-label={`View shopping cart with ${state.cart.length} items`}>
              <i
                className="bi-cart-plus-fill"
                style={{ fontSize: "1.5rem" }}></i>{" "}
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
      </div>
    </nav>
  );
};
export default Menu;
