import { ok } from "../utils/http/httpService.js";
import * as Service from "./service.js"

export const getAllMessages = async (req, res) => {
    return ok(res, await Service.getAll());
}

export const createMessage = async (req, res) => {
    const text = req.body.text

    return ok(res, await Service.create(text))
}

export const deleteMessage = async (req, res) => {
    const id = req.params.id

    return ok(res, await Service.remove(id))
}