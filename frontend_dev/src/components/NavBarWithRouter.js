import React from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router"

const NavBar = props => {
  const { location } = props;
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
      <Nav className="ml-auto" activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link href="/"><b>Dashboard</b></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/input"><b>Input</b></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="login"><b>Logout</b></Nav.Link> {/* TODO: call logout function */}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;