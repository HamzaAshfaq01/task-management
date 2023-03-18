// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// function App() {
// const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
//   useAuth0();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Oops... {error.message}</div>;
//   }

//   if (isAuthenticated) {
//     return (
//       <div>
//         Hello {user.name}{' '}
//         <button onClick={() => logout({ returnTo: window.location.origin })}>
//           Log out
//         </button>
//       </div>
//     );
//   } else {
//     return <button onClick={() => loginWithRedirect()}>Log in</button>;
//   }
// }

// export default App;

import { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import App from "../App";
import AuthRoutes from "./AuthRoutes.js";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<App />}>
          {user && isAuthenticated ? (
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
