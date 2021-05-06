import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-exueiqek.us.auth0.com"
    clientId="POHR1xL0okV5We7VrwW1KY277EabCHDy"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.querySelector("#root")
);
