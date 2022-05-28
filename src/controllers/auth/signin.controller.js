const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user.model");
const { compare } = require("../../utils/password");
const { generate } = require("../../utils/token");

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Email or Password field can't be empty",
    });
  }

  User.findUserByEmail(email, async (err, data) => {
    if (err) {
      return next(err);
    }

    if (!data) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        message: "Invalid Credentials",
      });
    }

    const isMatch = await compare(password, data.password);

    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        message: "Password Incorrect",
      });
    }

    const token = generate(data.id);

    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        token,
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      },
    });
  });
};
