import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes/AppRoutes";
import store from "./app/redux/store";
import "./index.css";
import { Provider } from "react-redux";
import ThemeProvider from "./app/theme/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    authorizationParams={{
      audience:process.env.REACT_APP_AUTH_AUDIENCE,
      redirect_uri: process.env.REACT_APP_AUTH_REDIRECT,
    }}
  >
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </Auth0Provider>
  // </GoogleOAuthProvider>
);
