import { Route, Routes, Navigate } from "react-router-dom";

import Profile from "../pages/Profile";
import Tasks from "../pages/Tasks";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<Navigate to="/user/profile" />} />
      <Route path="user/profile" element={<Profile />} />
      <Route path="user/tasks" element={<Tasks />} />
    </Routes>
  );
};

export default PrivateRoutes;
