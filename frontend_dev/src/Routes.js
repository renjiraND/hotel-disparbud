import React from "react";
import { Route, Switch } from "react-router-dom";
import {Home, Browse} from "./App.js";
import Login from "./containers/Login";


export default () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/browse" component={Browse} />
    <Route path="/login" component={Login} />
  </Switch>;