const router = require("express").Router();
const signupController = require("../controllers/auth/signup.controller");
const signinController = require("../controllers/auth/signin.controller");

router.post("/signup", signupController.signUp);

router.post("/signin", signinController.signin);

module.exports = router;
