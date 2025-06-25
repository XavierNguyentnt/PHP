import { Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Row>
        <Col xs={6}>
          <h1>LOGO</h1>
        </Col>
        <Col xs={6} className="text-right login-button">
          <Container>
            <Button>
              {" "}
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button>
              <Link to={"/register"}>Regsiter</Link>
            </Button>
          </Container>
        </Col>
      </Row>
    </header>
  );
}
export default Header;
