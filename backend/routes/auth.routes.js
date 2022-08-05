import Express from "express";
import { registerUser , loginUser } from "../controllers/auth.js";
const authRouter = Express.Router()

authRouter.post("/register" , registerUser)
authRouter.post("/login" , loginUser)

export default authRouter