// @ts-nocheck
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"
import ActivateAccount from "../pages/ActivateAccount"
import Registration from "../pages/Register"

const AuthRoutes = () => (
  <Routes>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="activate/:token" element={<ActivateAccount />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route index element={<Login />} />
  </Routes>
);

export default AuthRoutes;
