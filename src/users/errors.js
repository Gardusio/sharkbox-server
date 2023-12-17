import { notFound } from "../utils/http/httpService.js";

class UserNotFound extends Error {
    constructor(message) {
        super(message || "User not Found");
        this.name = "UserNotFound";
    }
}

const userErrorHandler = (err, _, res, next) => {

    if (err instanceof UserNotFound) {
        return notFound(res, { message: err.message })
    }
    next(err)
}


export { UserNotFound, userErrorHandler }