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
          <Link className="p-2" to={"/login"}>
            Login
          </Link>
          <Link to={"/register"}>Regsiter</Link>
        </Col>
      </Row>
    </header>
  );
}
export default Header;
