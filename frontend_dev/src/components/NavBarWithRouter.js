import React from "react";
import { Navbar,Nav } from "react-bootstrap";
import { withRouter } from "react-router"

const NavBar = props => {
  const { location } = props;
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Pengawasan Hotel / Logo</Navbar.Brand>
      <Nav className="ml-auto" activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link href="/">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/input">Input</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="login">Logout</Nav.Link> {/* TODO: call logout function */}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;