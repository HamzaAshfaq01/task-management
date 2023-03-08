import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes/AppRoutes";
import store from "./app/redux/store";
import "./index.css"
import { Provider } from "react-redux";
import ThemeProvider from "./app/theme/ThemeProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  </Provider>
);
