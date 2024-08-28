const { SID } = require("../models/user");

async function RestrictToLoggedUser(req, res, next) {
  const sessionId = req.cookies?.sid;
  if (!sessionId) {
    return res.redirect("/login");
  }

  const user = await SID.findOne({ sessionId: sessionId });

  if (!user) {
    return res.redirect("/login");
  }

  next();
}

module.exports = { RestrictToLoggedUser };
