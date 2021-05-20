const mongoose = require("mongoose");
const validator = require("validator");

const profilePicArray = [
  "https://www.rd.com/wp-content/uploads/2020/11/GettyImages-908012290-e1606774700282.jpg?resize=1024,682",
  "https://www.rd.com/wp-content/uploads/2009/02/A9E74F0C-C86F-443C-AD8F-43EE62451CEF-e1606771208368.jpeg?resize=1024,1024",
  "https://www.rd.com/wp-content/uploads/2020/12/265199384_1-Courtesy-Cindy-Johnson.jpg?resize=1271,1536",
  "https://www.rd.com/wp-content/uploads/2020/11/GettyImages-540904234.jpg?resize=1024,683",
  "https://www.rd.com/wp-content/uploads/2009/02/DSCN0626-scaled.jpg?resize=1024,683",
];

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
    type: Array,
  },
  favoriteChats: {
    type: Array,
  },
  posts: {
    type: Array,
  },
  friends: {
    type: Array,
  },
  pic: {
    type: String,
    default: profilePicArray[Math.floor(Math.random() * profilePicArray.length)],
  },
});

module.exports = User;
