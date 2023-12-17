import passport from "passport";
import { toUserResponse } from "../users/mapper.js";
import { ok, unauthorized, created } from "../utils/http/httpService.js";
import { getById, create } from "../users/service.js";

const doLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) return unauthorized(res, info);

        req.login(user, (err) => {
            if (err) return next(err);
            return ok(res, toUserResponse(req.user));
        });
    })(req, res, next)
}

const doLogout = (req, res) => {
    req.logout(() => {
        return ok(res, { data: "Logged Out" });
    });
}

const doRegister = async (req, res) => {
    const userForm = req.body;
    const newId = await create(userForm);
    return ok(res, newId);
}

const getSession = async (req, res) => {
    const user = await getById(req.user.id)

    return ok(res, toUserResponse(user))
}

export { doLogin, doLogout, getSession, doRegister }