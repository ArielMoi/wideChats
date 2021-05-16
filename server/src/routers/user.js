const {
  addUserController,
  getUserController,
  getAllUsersController,
  addToUserFavController,
  addToUserPostsController,
  addToUserFriendsController,
} = require("../controllers/user");
const express = require("express");
const router = new express.Router();

router.get("/users/", getAllUsersController);

router.get("/users/:name", getUserController);

router.post("/users/", addUserController);

router.post("/users/:name/:chat", addToUserFavController);

router.patch("/users/", addToUserPostsController);

router.patch("/users/friends/", addToUserFriendsController);

// remove Posts

// remove from friend list

// add and remove direct chats

module.exports = router;
