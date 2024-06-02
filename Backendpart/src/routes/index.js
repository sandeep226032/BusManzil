import express from "express";
import { search, play, register, check,logout,like } from "../controllers/index.js";
import { verifyuser } from "../middleware/index.js";
export const router = express.Router();
router.post("/bus", search);
router.post("/busstops", play);
router.post("/signup", register);
router.post("/login", check); 
router.post("/logout", verifyuser, logout)
router.post("/like", verifyuser, like);