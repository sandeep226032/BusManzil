import dotenv from "dotenv";
dotenv.config()
import jwt from "jsonwebtoken";
import { signmodel } from "../models/index.js";

export const verifyuser = async (req, res, next) => {
    try {
        const access = req.cookies.Accesstoken;
            // || req.header("Authorization").replace("Bearer ", "");
        console.log(access);
        if (!access) {
            res.status(404).json({
                message: "unauthorised request"
            })
        }
        const decode = jwt.verify(access, process.env.ACCESS_SECRET_KEY)
        // const user = await signmodel.findByid(decode._id);
        const user = await signmodel.findOne({ email: decode.email }).select("-password -refreshtoken")
        if (!user) {
            res.status(404).json({
                meassage:"invalid autotoken"
            })
        }
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.log("error in first middlware", error);
    }
}