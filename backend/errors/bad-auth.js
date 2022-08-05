import { customError } from "./custom-error.js";

export class badAuth extends customError{
    constructor(message){
        super(message)
        this.statusCode = 404
    }
}