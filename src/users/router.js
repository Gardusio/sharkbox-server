import { Router } from "express"
import { asyncHandle } from "../utils/errors/asyncHandler.js";
import { isLoggedIn, canAccessUserInfo } from "../auth/authMiddlewares.js";
import { getUser, getAllUsers } from "./controller.js";

const usersRouter = Router();

usersRouter.get("/:id", isLoggedIn, canAccessUserInfo, asyncHandle(getUser));
usersRouter.get("/", asyncHandle(getAllUsers));


export { usersRouter }