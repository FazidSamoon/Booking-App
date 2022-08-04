import { customError } from "./custom-error.js";

export class notFound extends customError{
    constructor(message){
        super(message)
        this.statusCode = 400
    }
}