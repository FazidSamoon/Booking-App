import { customError } from "./custom-error.js";

export class unAuthorized extends customError{
    constructor(message){
        super(message)
        this.statusCode = 401
    }
}