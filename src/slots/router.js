import { Router } from "express"
import { asyncHandle } from "../utils/errors/asyncHandler.js";
import { removeSlot } from "./controller.js";

const slotRouter = Router();

//TODO : AUTH AUTH
slotRouter.delete("/:id", asyncHandle(removeSlot));

export { slotRouter }