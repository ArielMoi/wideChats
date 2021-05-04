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

const getUser = async (id) => {
    return await User.findById(id)
}

const getAllUsers = async () => {
    return await User.find({})
}

// getUser("608fdfc61adbc95b2cedbfca").then(user => console.log(user))
// getAllUsers().then(users => console.log(users))
// addUser('ariel', 'ariel@gmail.com')

module.exports = {
    addUser,
    getUser,
    getAllUsers,
}