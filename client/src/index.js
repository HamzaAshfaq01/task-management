import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes/AppRoutes";
import store from "./app/redux/store";
import "./index.css";
import { Provider } from "react-redux";
import ThemeProvider from "./app/theme/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>
);
