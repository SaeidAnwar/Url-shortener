const { USER, SID } = require("../models/user");
const { uuid } = require("uuidv4");

async function HandleShowSignupForm(req, res) {
  const sessionId = req.cookies?.sid;
  const sid = await SID.findOne({ sessionId: sessionId });
  // if (sid) {
  //   return res.redirect(`/?username=${sid.username}`);
  // }
  return res.render("signup");
}

async function HandleShowLoginForm(req, res) {
  const sessionId = req.cookies?.sid;
  const sid = await SID.findOne({ sessionId: sessionId });
  if (sid) {
    return res.redirect(`/?username=${sid.username}`);
  }
  return res.render("login");
}

// check here whether user exists or not.
async function HandleNewUserSignup(req, res) {
  const body = req.body;
  if (!body.username || !body.email || !body.password) {
    return res.status(400).json({ msg: "please fill all details" });
  }

  //find if user exist

  await USER.create({
    username: body.username,
    email: body.email,
    password: body.password,
  });

  return res.redirect("/login");
}

async function HandleLogin(req, res) {
  const body = req.body;
  if (!body.username || !body.password) {
    return res.status(400).json({ msg: "please fill all details" });
  }

  const user = await USER.findOne({
    username: body.username,
    password: body.password,
  });

  if (!user) {
    return res
      .status(400)
      .json({
        msg: "no matching user found either signup or fill correct details",
      });
  }

  const sessionId = uuid();
  await SID.create({
    sessionId: sessionId,
    username: body.username,
  });
  res.cookie("sid", sessionId);

  return res.redirect(`/?username=${body.username}`);
}

module.exports = {
  HandleNewUserSignup,
  HandleShowSignupForm,
  HandleLogin,
  HandleShowLoginForm,
};


