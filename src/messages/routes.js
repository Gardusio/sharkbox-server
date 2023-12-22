import { Router } from "express"
import { asyncHandle } from "../utils/errors/asyncHandler.js";
import { isLoggedIn, canAccessUserInfo } from "../auth/authMiddlewares.js";
import { createMessage, getAllMessages, deleteMessage } from "./controller.js";


const messagesRouter = Router();

messagesRouter.post("/", asyncHandle(createMessage))
messagesRouter.delete("/:id", asyncHandle(deleteMessage));
messagesRouter.get("/", asyncHandle(getAllMessages));


export { messagesRouter }