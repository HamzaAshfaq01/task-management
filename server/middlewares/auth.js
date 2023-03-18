import { expressjwt } from "express-jwt";
import jwtClient from "jwks-rsa";

import {
  AUTH_AUDIENCE,
  AUTH_ISSUER,
  AUTH_JWKSURI,
} from "../constants/config.const.js";

export const protect = expressjwt({
  secret: jwtClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: AUTH_JWKSURI,
  }),
  audience: AUTH_AUDIENCE,
  issuer: AUTH_ISSUER,
  algorithms: ["RS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});

// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";
// import { JWT_SECRET } from "../constants/config.const.js";

// export const protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (token == "undefined") {
//     return res.status(401).json({
//       error: "Not authorized to access this route",
//     });
//   }
//   const decoded = jwt.verify(token, JWT_SECRET);
//   try {
//     const user = await User.findById(decoded._id);
//     if (!user) {
//       return res.status(401).json({
//         error: "Not user found with this id",
//       });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       error: "Not authorized to access this route",
//     });
//   }
// };
