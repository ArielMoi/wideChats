const User = require("../models/user");

const {
  addUser,
  getUser,
  getAllUsers,
  addToUserFav,
  addToUserCreated,
  addToUserPosts,
  addToUserFriends,
  deletePost,
  replacePost,
  deleteFriend
  deleteFavorite,
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

const addToUserPostsController = async (req, res) => {
  try {
    const user = await addToUserPosts(req.body.username, req.body.post);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const addToUserFriendsController = async (req, res) => {
  try {
    const user = await addToUserFriends(req.body.username, req.body.friendName);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deletePostController = async (req, res) => {
  try {
    const user = await deletePost(req.body.username, req.body.post);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const replacePostController = async (req, res) => {
  try {
    const user = await replacePost(
      req.body.username,
      req.body.lastPost,
      req.body.newPost
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteFriendController = async (req, res) => {
  try {
    const user = await deleteFriend(req.body.username, req.body.friendToDelete);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteFavoriteController = async (req, res) => {
  try {
    const user = await deleteFavorite(req.body.username, req.body.favoriteToDelete);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  addUserController,
  getUserController,
  getAllUsersController,
  addToUserFavController,
  addToUserPostsController,
  addToUserFriendsController,
  deletePostController,
  replacePostController,
  deleteFriendController,
  deleteFavoriteController,
};
