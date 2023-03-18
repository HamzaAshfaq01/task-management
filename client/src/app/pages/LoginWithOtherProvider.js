import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Button,
  Card,
  CircularProgress,
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const {
    loginWithPopup,
    loginWithRedirect,
    isLoading,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();
  return (
    <Card
      sx={{
        mt: 3,
        p: 4,
      }}
    >
      <form noValidate>
        <Button
          sx={{ marginTop: 3 }}
          startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
          disabled={Boolean(isLoading)}
          fullWidth
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => loginWithRedirect()}
          data-testid="submit"
        >
          Sign in with Auth0
        </Button>
      </form>
    </Card>
  );
};

export default LoginPage;

// import {
//   Box,
//   Container,
//   Typography,
//   Link as MuiLink,
//   Card,
// } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
// import axios from "../utils/axios";

// const LoginPage = () => {
//   const location = useLocation();
//   let from = location.state?.from?.pathname || "/";

//   // Login With Google
//   const sendGoogleToken = (tokenId) => {
//     axios
//       .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
//         idToken: tokenId,
//       })
//       .then((res) => {
//         console.log(res);
//         // informParent(res);
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log("GOOGLE SIGNIN ERROR", error.response);
//       });
//   };
//   const responseGoogle = (response) => {
//     console.log(response.tokenId);
//     sendGoogleToken(response.tokenId);
//   };

//   return (
//     <Card
//       sx={{
//         mt: 3,
//         p: 4,
//       }}
//     >
//       <form noValidate>
//         <GoogleLogin
//           clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
//           onSuccess={responseGoogle}
//           onFailure={responseGoogle}
//           cookiePolicy={"single_host_origin"}
//           render={(renderProps) => (
//             <button
//               onClick={renderProps.onClick}
//               disabled={renderProps.disabled}
//               className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
//             >
//               <div className=" p-2 rounded-full ">
//                 <i className="fab fa-google " />
//               </div>
//               <span className="ml-4">Sign In with Google</span>
//             </button>
//           )}
//         ></GoogleLogin>
//       </form>
//     </Card>
//   );
// };

// export default LoginPage;
