import dotenv from "dotenv"
import express from "express"
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import taskRouter from "./routes/task.routes.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
global.__basedir = __dirname;

dotenv.config()

const app = express();
app.use(express.json());
connectDB();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, //access-control-allow-credentials:true
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./uploads")));

// Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", taskRouter);

app.get("/", (req, res) => {
  res.status(404).json({
    msg: "Node Api",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not founded",
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "PRODUCTION") {
  // Set static folder
  app.use(express.static("../client/build"));
  app.use(express.static(path.join(__dirname, "./uploads")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../' , "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
