import Express from "express";
import dotenv from 'dotenv'
import 'express-async-errors'
import cookieParser from "cookie-parser";
import connectDB from './database/connect.js'
import route from './routes/index.routes.js'
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import cors from 'cors'
dotenv.config()
const app = Express()

const port = process.env.PORT || 5000
app.use(Express.json())
app.use(cors())
app.use(cookieParser())
app.get("/" , (req,res)=>{
    res.send("Booking app")
})

//middleware
app.use("/api/v1" , route)
app.use(errorHandlerMiddleware)

try {
    connectDB()
    app.listen(port , () => {
        console.log(`app is listning on port ${port}`);
    })
} catch (error) {
    console.log(error);
}
