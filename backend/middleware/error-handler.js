import { customError } from "../errors/custom-error.js"

export const errorHandlerMiddleware = (err , req , res , next) => {
    if (err instanceof customError){
        return res.status(err.statusCode).json({ msg: err.message });
    }
}