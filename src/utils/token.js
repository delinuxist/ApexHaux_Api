const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.TOKEN_SECRET;

const generate = (id) => jwt.sign({ id }, secret, { expiresIn: "1d" });

const decode = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  generate,
  decode,
};
