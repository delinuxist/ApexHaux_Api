const CustomAPIError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  res.status(500).json({
    error: "error",
    message: err.message,
  });
};

module.exports = errorHandler;
