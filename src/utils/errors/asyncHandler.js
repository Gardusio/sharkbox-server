export const asyncHandle = (routeHandler) => {
    return async (req, res, next) => {
        try {
            return await routeHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};