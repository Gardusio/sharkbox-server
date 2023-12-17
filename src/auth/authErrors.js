import { unauthorized } from "../utils/http/httpService.js"

class BadCredentials extends Error {
    constructor(message) {
        super(message || "Wrong email or password");
        this.name = "BadCredentials";
    }
}


const authErrorHandler = (err, _, res, next) => {

    if (err instanceof BadCredentials) {
        return unauthorized(res, { message: err.message })
    }

    next(err)
}


export { authErrorHandler, BadCredentials }