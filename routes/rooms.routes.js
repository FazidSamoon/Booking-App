import Express from "express";
import {
  getAllRooms,
  createRoom,
  deleteRoom,
  updateRoom,
  getRoomByID,
} from "../controllers/room.js";
import {
  adminProtect,
  authMiddleware,
} from "../middleware/authenticationMiddleware.js";
const roomsRoutes = Express.Router();

roomsRoutes.get("/", getAllRooms);
roomsRoutes.get("/:id", getRoomByID);
roomsRoutes.post("/:hotelId", authMiddleware, adminProtect, createRoom);
roomsRoutes.patch("/:id", authMiddleware, adminProtect, updateRoom);
roomsRoutes.delete("/:id/:hotelId", authMiddleware, adminProtect, deleteRoom);

export default roomsRoutes;
