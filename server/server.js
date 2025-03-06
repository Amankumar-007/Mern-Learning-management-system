import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
ConnectDB();

const app = express(); // ✅ Moved this line up

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
