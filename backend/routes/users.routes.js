import Express from "express";
import {
  getAllUsers,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/user.js";
import { adminProtect , authMiddleware } from "../middleware/authenticationMiddleware.js";
const userRoutes = Express.Router();

userRoutes.get("/", authMiddleware , adminProtect , getAllUsers);
userRoutes.get("/:id",authMiddleware , getUserByID);
userRoutes.patch("/:id", authMiddleware , updateUser);
userRoutes.delete("/:id", authMiddleware , deleteUser);

export default userRoutes;
