import { unauthorized } from "../utils/http/httpService.js";

const loginAgain = { message: 'Please login to access this resource' }
const unauthorizedResponse = { message: 'You can not access this resource' }

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated())
        return unauthorized(res, loginAgain);

    next();
}

const isAdmin = (req, res, next) => {
    if (req.user.role != "ADMIN")
        return unauthorized(res, loginAgain);

    next();
}

const canAccessUserInfo = (req, res, next) => {

    if (req.params.id != req.user.id)
        return unauthorized(res, unauthorizedResponse)

    next()
}


export { isLoggedIn, canAccessUserInfo, isAdmin }