const errorHandler = (next, errorCode) => {
    next(createError(errorCode));
}
