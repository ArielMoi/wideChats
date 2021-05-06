const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const Chat = mongoose.model("Chat", {
  name: {
    type: String,
    required: true,
  },
  participants: [
    {
      participant: {
        type: ObjectId,
      },
    },
  ],
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
