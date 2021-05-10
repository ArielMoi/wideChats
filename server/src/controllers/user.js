const User = require("../models/user");

const {
  addUser,
  getUser,
  getAllUsers,
  addToUserFav,
  addToUserCreated,
} = require("../utils/user");

const addUserController = async (req, res) => {
  // post
  try {
    const user = await addUser(req.body.name, req.body.email);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const addToUserFavController = async (req, res) => {
  // post
  try {
    if (req.query.created) {
      const user = await addToUserCreated(req.params.name, req.params.chat);
      return res.status(200).send(user);
    }
    const user = await addToUserFav(req.params.name, req.params.chat);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.params.name);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  addUserController,
  getUserController,
  getAllUsersController,
  addToUserFavController,
};
