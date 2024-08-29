require('dotenv').config()
const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/user");
const { ConnectToMongoDB } = require("./connection");
const { RestrictToLoggedUser } = require("./middlewares/user");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

ConnectToMongoDB(MONGO_URL).then(() =>
  console.log("successfully connected to db.")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/views/')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", staticRoute);
app.use("/", RestrictToLoggedUser, urlRoute);



app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
