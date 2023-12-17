
const getPagination = (req, _, next) => {
    const page = req.query.page
    const pageSize = req.query.limit;

    if (!page || !pageSize) return next()

    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);

    const startIndex = (pageNumber - 1) * pageSizeNumber;

    /**
     * I find "next" and "prev" to somehow violate REST statelessness, so i don't include them in response objects.
     * A client should on it's on decide what page to get next
     */
    // const endIndex = startIndex + pageSize;

    const pagination = {
        limit: pageSizeNumber,
        startIndex,
    };

    req.pagination = pagination
    next();
}

export { getPagination }