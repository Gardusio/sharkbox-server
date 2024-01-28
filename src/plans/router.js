import { Router } from "express"
import { asyncHandle } from "../utils/errors/asyncHandler.js";


const plansRouter = Router();


plansRouter.get("/:id", asyncHandle(getPlan));


export { courseRouter }