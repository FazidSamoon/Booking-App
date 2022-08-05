import Express from "express";
import {
  getAllHotels,
  createHotel,
  deleteHotel,
  getHotelByID,
  updateHotel,
} from "../controllers/hotel.js";
import { adminProtect, authMiddleware } from "../middleware/authenticationMiddleware.js";
const hotelRoutes = Express.Router();

hotelRoutes.get("/", getAllHotels);
hotelRoutes.get("/:id", getHotelByID);
hotelRoutes.post("/" , authMiddleware ,adminProtect ,createHotel);
hotelRoutes.patch("/:id", authMiddleware , adminProtect , updateHotel);
hotelRoutes.delete("/:id", authMiddleware ,adminProtect , deleteHotel);

export default hotelRoutes;
