import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Navbar,Nav } from "react-bootstrap";
import Routes from "./Routes";
import { withRouter } from "react-router"

const Header = props => {
  const { location } = props;
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Pengawasan Hotel / Logo</Navbar.Brand>
      <Nav className="ml-auto" activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link href="/">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/browse">Input</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="login">Logout</Nav.Link> {/* call logout function */}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

const HeaderWithRouter = withRouter(Header);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <HeaderWithRouter />
          <div className="container">
            <Routes/>
          </div>
        </div>
      </Router>
    );
  }
}
