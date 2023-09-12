import express from "express";
import mongoose from "mongoose";
import connectDB from "./data/database.js";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import tasksRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
const app = express();
config({
    path: "./data/config.env"
});

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks", tasksRouter);

app.listen(3000, ()=>{
    console.log("server is running");
})