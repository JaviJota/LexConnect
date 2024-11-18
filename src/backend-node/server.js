import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// imports rutas
import userRoutes from "./routes/user.routes.js";
import clientRoutes from "./routes/client.routes.js";
import caseFileRoutes from "./routes/caseFile.routes.js";
import debtRoutes from "./routes/debt.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

export const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  const publicRoutes = ['/users', '/users/register', '/users/login', '/users/refresh-token', 'auth/refresh'];

  if(publicRoutes.includes(req.path)) {
    return next();
  };

  const rawToken = req.headers["authorization"];
  const token = rawToken && rawToken.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access denied: Invalid token." });
    }

    req.user = user;
    next();
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userRoutes);
app.use(clientRoutes);
app.use(caseFileRoutes);
app.use(debtRoutes);
app.use(paymentRoutes);
