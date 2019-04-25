import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import NavBarWithRouter from "./components/NavBarWithRouter";

function App() {
  return (
    <Router>
      <div>
        <NavBarWithRouter />
        <div className="container">
          <Routes/>
        </div>
      </div>
    </Router>
  );
}

export default App;
