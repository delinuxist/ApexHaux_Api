const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();

const secret = process.env.TOKEN_SECRET;

const generate = (id) => jwt.sign({ id }, secret, { expiresIn: "1d" });

const decode = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new CustomAPIError("Not Authenticated", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = {
  generate,
  decode,
};
