import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login/Login.Component";

ReactDOM.render(
  <Auth0Provider
    domain="dev-exueiqek.us.auth0.com"
    clientId="POHR1xL0okV5We7VrwW1KY277EabCHDy"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/login" exact component={Login} />
    </BrowserRouter>
    {/* <App /> */}
  </Auth0Provider>,
  document.querySelector("#root")
);
