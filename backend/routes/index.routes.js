import Express from "express";
import { authMiddleware } from "../middleware/authenticationMiddleware.js";
import authRouter from "./auth.routes.js";
import hotelRoutes from "./hotels.routes.js";
import roomsRoutes from "./rooms.routes.js";
import userRoutes from "./users.routes.js";
const route = Express.Router()

route.use("/auth" , authRouter)
route.use("/hotels" ,  hotelRoutes)
route.use("/rooms" , roomsRoutes)
route.use("/users" , userRoutes)

export default route;