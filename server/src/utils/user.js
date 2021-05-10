const User = require("../models/user");

const addUser = async (name, email) => {
  try {
    const user = new User({
      name,
      email,
    });
    await user.save();
    return user;
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (name) => {
    return await User.find({name})
}

const getAllUsers = async () => {
    return await User.find({})
}

const addToUserFav = async (userName, chat) => {
  return await User.findOneAndUpdate(
    { name: userName },
    { $push: { favoriteChats: chat } },
    { new: true }
  );
}

const addToUserCreated = async (userName, chat) => {
  return await User.findOneAndUpdate(
    { name: userName },
    { $push: { createdChats: chat } },
    { new: true }
  );
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  addToUserFav,
  addToUserCreated,
};