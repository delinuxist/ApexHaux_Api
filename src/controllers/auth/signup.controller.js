const User = require("../../models/user.model");
const uniqId = require("uniqid");
const { generate: generateToken } = require("../../utils/token");
const { hash: hashPassword } = require("../../utils/password");

exports.signUp = async (req, res) => {
  // destructure fields from req.body
  const { email, first_name, last_name, password, phone, address, is_admin } =
    req.body;

  // generate a unique id with uniqId package
  const id = uniqId();

  // generate token
  const token = generateToken(id);

  // hash password
  const hashedPassword = await hashPassword(password);

  //create newUser using the User model
  const newUser = new User(
    id,
    email,
    first_name,
    last_name,
    hashedPassword,
    phone,
    address,
    is_admin
  );

  // save newUser to db using create method in User model
  User.create(newUser, (data, err) => {
    // check for errors
    if (err) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
    // return token and data after creating user
    res.status(201).json({
      status: "success",
      data: {
        token: token,
        data,
      },
    });
  });
};
