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
  console.log(token);

  try {
    const payload = decode(token);
    req.user = {
      userId: payload.id,
    };
    console.log(req.user);
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "Not Authorized",
    });
  }
  next();
};

module.exports = AuthMiddleware;
