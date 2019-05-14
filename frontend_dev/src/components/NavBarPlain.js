import React from "react";
import { Navbar, Row, Col } from "react-bootstrap";

const NavBar = props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <Row>
          <Col>
            <img
              alt=""
              src="./images/logo-pemprov-jabar.png"
              width="66"
              height="66"
              className="d-inline-block align-center ml-2"
            />
          </Col>
          <Col className="d-flex align-items-center">
            <h3 className="mb-1">Pengawasan Hotel</h3>
          </Col>
        </Row>
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;