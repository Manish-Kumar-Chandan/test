const createError = require("create-error");
const httpStatus = require("http-status");
const ValidationError = createError("ValidationError", {
  message: "Please check form for validation error",
  errors: [],
});

const ServerError = createError("ServerError", {
  message: "An unknown error occured while processing your request!",
  statusCode: httpStatus.INTERNAL_SERVER_ERROR,
});

const CustomError = createError("CustomError", {
  message: "An unknown error occured while processing your request!",
  statusCode: httpStatus.UNPROCESSABLE_ENTITY,
});

const firstError = (validation) => {
  let errorMsg = "";
  const errors = validation.errors.errors;
  for (const key in errors) {
    errorMsg = errors[key][0];
    break;
  }
  return errorMsg;
};

module.exports = { ValidationError, ServerError, CustomError, firstError };
