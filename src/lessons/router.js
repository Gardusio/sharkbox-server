import { Router } from "express"
import { asyncHandle } from "../utils/errors/asyncHandler.js";
import {
    create, getAllByDate, getById, update, remove,
    addPartecipant, removePartecipant, getByUser
} from "./controller.js";


const lessonRouter = Router();

//TODO : AUTH AUTH
lessonRouter.post("/", asyncHandle(create));
lessonRouter.put("/", asyncHandle(update));
lessonRouter.get("/:date", asyncHandle(getAllByDate));
lessonRouter.get("/lesson/:id", asyncHandle(getById));
lessonRouter.delete("/:id", asyncHandle(remove));
lessonRouter.post("/:id/partecipants", asyncHandle(addPartecipant));
lessonRouter.put("/:id/partecipants/:uid", asyncHandle(removePartecipant));
lessonRouter.get("/user/:id", asyncHandle(getByUser));

export { lessonRouter }