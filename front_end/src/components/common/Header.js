import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Row>
        <Col xs={6}>
          <h1>LOGO</h1>
        </Col>
        <Col xs={6} className="text-right">
          <Link className="btn btn-primary me-2" to={"/login"}>
            Login
          </Link>

          <Link className="btn btn-success me-2" to={"/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </header>
  );
}
export default Header;
