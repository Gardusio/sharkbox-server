import { removeBySlot } from "../lessons/service.js";
import { ok } from "../utils/http/httpService.js";
import { remove } from "./service.js"

export const removeSlot = async (req, res) => {
    const slotId = req.params.id

    await remove(slotId);

    await removeBySlot(slotId)

    return ok(res, "deleted")
}