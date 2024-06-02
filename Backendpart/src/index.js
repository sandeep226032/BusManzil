
import dotenv from "dotenv";
dotenv.config()
import express from "express";

import cors from "cors";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded())
app.use(cookieParser())

app.get("/home", (req, res) => {
    
    res.send("hello");
})
app.use("/home", router);

app.listen(process.env.PORT, () => {
    console.log("server is running succesfully", process.env.PORT);
})