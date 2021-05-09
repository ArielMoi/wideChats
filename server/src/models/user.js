const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not a valid email");
      }
    },
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  createdChats: [
    {
      chat: {
        type: String, // name of chat (room for socket io)
      },
    },
  ],
  joinedChats: [
    {
      chat: {
        type: String, // name of chat (room for socket io)
      },
    },
  ]
});

module.exports = User;
