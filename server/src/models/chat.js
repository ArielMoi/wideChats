const mongoose = require("mongoose");

const Chat = mongoose.model("Chat", {
  name: {
    type: String,
    required: true,
  },
  participants: {
    type: Array
  },
  messages: {
    type: Array
  },
  type: {
    type: String,
    default: "general",
  },
  creator: {
    type: String,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  }
});

module.exports = Chat;
