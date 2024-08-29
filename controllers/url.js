const shortid = require("shortid");
const URL = require("../models/url");
const { SID } = require("../models/user");

async function HandleShowHomePage(req, res) {
    const sessionId = req.cookies?.sid;
    if(!sessionId) {
        res.redirect("/login");
    }    

    const user = await SID.findOne({ sessionId: sessionId });
    const urlList = await URL.find({ username: user.username });
    return res.render("home", { username: user.username, urlList: urlList });
}

async function HandleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.redirect("/");
    }

    if (await URL.findOne({ redirectURL: body.url })) {
        return res.redirect("/");
    }

    const shortID = shortid(8);
    await URL.create({
        username: body.username,
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    const urlList = await URL.find({ username: body.username });

    return res.render("home", {
        username: body.username,
        shortId: shortID,
        urlList: urlList,
    });
}

async function HandleGetURLByShortURL(req, res) {
    const shortUrl = req.params.id;
    if (!shortUrl) {
        return res.status(400).json({ error: "short url is required" });
    }

    const entry = await URL.findOneAndUpdate(
        { shortId: shortUrl },
        { $push: { visitHistory: { timeStamp: Date.now() } } }
    );

    if (!entry) {
        return res
            .status(400)
            .json({ error: "no url with this short url found" });
    }

    res.redirect(entry.redirectURL);
}

module.exports = {
    HandleGenerateNewShortURL,
    HandleGetURLByShortURL,
    HandleShowHomePage,
};
