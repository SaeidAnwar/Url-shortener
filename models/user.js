const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const sessionIdSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, expireAfterSeconds: 86400 }
);

const USER = mongoose.model("user", userSchema);
const SID = mongoose.model("sid", sessionIdSchema);

module.exports = { USER, SID };
