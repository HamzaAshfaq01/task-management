import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const API_VERSION = process.env.API_VERSION;
export const MONGO_URI = process.env.MONGO_URI;
export const CLIENT_URL = process.env.CLIENT_URL;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ACCOUNT_ACTIVATION = process.env.JWT_ACCOUNT_ACTIVATION;
export const JWT_RESET_PASSWORD = process.env.JWT_RESET_PASSWORD;
export const YOUR_MAIL = process.env.YOUR_MAIL;
export const GOOGLE_CLIENT = process.env.GOOGLE_CLIENT;
export const EMAIL_FROM=process.env.EMAIL_FROM
export const SECRET_KEY=process.env.SECRET_KEY