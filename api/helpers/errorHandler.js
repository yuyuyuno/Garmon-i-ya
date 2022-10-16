const createError = require('http-errors');

const errorHandler = (next, errorCode) => {
    next(createError(errorCode));
}

module.exports = errorHandler;
