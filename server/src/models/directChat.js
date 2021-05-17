const mongoose = require("mongoose");

const DirectChat = mongoose.model("Chat", {
  name: {
    type: String,
  },
  messages: {
    type: Array,
  },
  receiverSaw: {
    type: Boolean,
    default: false,
  },
});

module.exports = DirectChat;
