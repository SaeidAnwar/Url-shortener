const { USER, SID } = require("../models/user");
const { uuid } = require("uuidv4");
const sha1 = require("sha1");

async function HandleShowSignupForm(req, res) {
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
        return res.render("signup", { msg: "please fill all details" });
    }

    //find if user exist
    const user = await USER.findOne({ username: body.username });
    const email = await USER.findOne({ email: body.email });

    if (user && email) {
        return res.render("signup", {
            msg: "username and email exists",
        });
    }

    if (user) {
        return res.render("signup", {
            msg: "username exists",
        });
    }

    if (email) {
        return res.render("signup", {
            msg: "email exists",
        });
    }

    const encryptedPassword = sha1(body.password);
    await USER.create({
        username: body.username,
        email: body.email,
        password: encryptedPassword,
    });

    return res.redirect("/login");
}

async function HandleLogin(req, res) {
    const body = req.body;
    if (!body.username || !body.password) {
        return res.render("login", { msg: "please fill all details" });
    }
    
    const encryptedPassword = sha1(body.password);
    const user = await USER.findOne({
        username: body.username,
        password: encryptedPassword,
    });

    if (!user) {
        return res.render("login", {
            msg: "incorrect username or password",
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

async function HandleLogout(req, res) {
    const sessionId = req.cookies?.sid;
    await SID.findOneAndDelete({ sessionId: sessionId });
    res.clearCookie("sid");

    return res.redirect("/login");
}

module.exports = {
    HandleNewUserSignup,
    HandleShowSignupForm,
    HandleLogin,
    HandleShowLoginForm,
    HandleLogout,
};
