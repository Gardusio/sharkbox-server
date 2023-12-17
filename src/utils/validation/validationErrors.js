import { ValidationError } from "express-json-validator-middleware";
import { badRequest } from "../http/httpService.js";

const requestValidationErrorHandler = (err, req, res, next) => {
    ("Request validation failed for", req.url)
    if (err instanceof ValidationError) {console.log

        // This can be improved with more structured errors informations
        const errs = err.validationErrors.body.map(err => err.message)

        return badRequest(res, {
            message: "Request Validation Errors",
            errors: errs
        })
    }
    next(err)
}

export { requestValidationErrorHandler }