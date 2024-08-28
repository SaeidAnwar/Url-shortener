const express = require("express");
const router = express.Router();

const {
  HandleNewUserSignup,
  HandleShowSignupForm,
  HandleLogin,
  HandleShowLoginForm,
} = require("../controllers/user");

router.route("/signup").get(HandleShowSignupForm).post(HandleNewUserSignup);
router.route("/login").get(HandleShowLoginForm).post(HandleLogin);

module.exports = router;
