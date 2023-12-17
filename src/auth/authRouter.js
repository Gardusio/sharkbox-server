
import { Router } from "express"
import { isLoggedIn } from "./authMiddlewares.js";
import { doLogin, doLogout, getSession, doRegister } from "./authController.js";
import { asyncHandle } from "../utils/errors/asyncHandler.js";

const authRouter = Router();

authRouter.get("/session/", isLoggedIn, asyncHandle(getSession));

authRouter.post("/login", asyncHandle(doLogin))

authRouter.post("/register", asyncHandle(doRegister))

authRouter.delete('/logout', doLogout);

export { authRouter }