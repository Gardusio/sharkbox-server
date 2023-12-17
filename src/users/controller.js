import { ok } from "../utils/http/httpService.js";
import { toUserResponse, toUsersResponse } from "./mapper.js";
import { getById, getAll } from "./service.js";

export const getUser = async (req, res) => {
    const user = await getById(req.params.id);

    return ok(res, toUserResponse(user))
}

export const getAllUsers = async (req, res) => {
    const user = await getAll();

    return ok(res, toUsersResponse(user))
}
