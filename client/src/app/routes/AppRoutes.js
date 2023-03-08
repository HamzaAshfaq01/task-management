import { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import AuthRoutes from "./AuthRoutes.js";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  let isAuthenticated = true;
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<App />}>
          {isAuthenticated ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="user/profile" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="auth/login" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
