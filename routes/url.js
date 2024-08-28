const express = require("express");
const router = express.Router();

const { HandleGenerateNewShortURL, HandleGetURLByShortURL, HandleShowHomePage} = require("../controllers/url");

router.get("/", HandleShowHomePage);

router.post("/", HandleGenerateNewShortURL);

router.get("/:id", HandleGetURLByShortURL);

module.exports = router;