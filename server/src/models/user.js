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
  createdChats: {
    type: Array
  }, 
  favoriteChats: {
    type: Array
  },
  posts: {
    type: Array
  }
});

module.exports = User;
