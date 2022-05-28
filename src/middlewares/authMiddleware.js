const { StatusCodes } = require("http-status-codes");
const { decode } = require("../utils/token");

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "Not Authorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = decode(token);
    req.user = {
      userId: payload.id,
    };
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "Not Authorized or Invalid Token",
    });
  }
  next();
};

module.exports = AuthMiddleware;
