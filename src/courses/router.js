import { Router } from "express"
import { asyncHandle } from "../utils/errors/asyncHandler.js";
import { isLoggedIn, isAdmin } from "../auth/authMiddlewares.js";
import { createCourse, getAllCourses, getCourseById, removeCourse, updateCourse } from "./controller.js";


const courseRouter = Router();
/*
courseRouter.post("/", isLoggedIn, isAdmin, asyncHandle(createCourse));

courseRouter.get("/:id", isLoggedIn, isAdmin, asyncHandle(getCourseById));

courseRouter.get("/", isLoggedIn, isAdmin, asyncHandle(getAllCourses));
*/

courseRouter.post("/", asyncHandle(createCourse));
courseRouter.put("/", asyncHandle(updateCourse));

courseRouter.get("/:id", asyncHandle(getCourseById));
courseRouter.delete("/:id", asyncHandle(removeCourse));

courseRouter.get("/", asyncHandle(getAllCourses));


export { courseRouter }