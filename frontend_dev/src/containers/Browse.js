import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Hotel({ match }) {
  return <h3>Requested hotel id: {match.params.id}</h3>;
}

export default function Browse({ match }) {
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