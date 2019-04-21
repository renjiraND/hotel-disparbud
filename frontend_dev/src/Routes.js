import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Input from "./containers/Input";
import Login from "./containers/Login";


export default () =>
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/input" component={Input} />
    <Route path="/login" component={Login} />
  </Switch>;