import { notFound } from "../utils/http/httpService.js";

class CourseNotFound extends Error {
    constructor(message) {
        super(message || "Course not Found");
        this.name = "CourseNotFound";
    }
}

const courseErrorHandler = (err, _, res, next) => {

    if (err instanceof CourseNotFound) {
        return notFound(res, { message: err.message })
    }
    next(err)
}


export { CourseNotFound, courseErrorHandler }