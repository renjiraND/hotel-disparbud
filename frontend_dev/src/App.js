import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar,Nav } from "react-bootstrap";
import Routes from "./Routes";
import { withRouter } from "react-router"


function App() {
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

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      Welcome to Disparbud Hotel Data Center!
    </div>
  );
}

function Hotel({ match }) {
  return <h3>Requested hotel id: {match.params.id}</h3>;
}

export function Browse({ match }) {
  return (
    <div>
      <h2>Browse Hotels</h2>

      <ul>
        <li>
          <Link to={`${match.url}/hotels/0`}>Hotel 0</Link>
        </li>
        <li>
          <Link to={`${match.url}/hotels/1`}>Hotel 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/hotels/2`}>Hotel 2</Link>
        </li>
      </ul>

      <Route path={`${match.path}/hotels/:id`} component={Hotel} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a hotel.</h3>}
      />
    </div>
  );
}

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

export default App;
