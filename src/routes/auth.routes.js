const router = require("express").Router();
const signupController = require("../controllers/auth/signup.controller");

router.post("/signup", signupController.signUp);

module.exports = router;
