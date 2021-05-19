const {
  addUserController,
  getUserController,
  getAllUsersController,
  addToUserFavController,
  addToUserPostsController,
  addToUserFriendsController,
  deletePostController,
  replacePostController,
  deleteFriendController,
} = require("../controllers/user");
const express = require("express");
const router = new express.Router();

router.get("/users/", getAllUsersController);

router.get("/users/:name", getUserController);

router.post("/users/", addUserController);

router.post("/users/:name/:chat", addToUserFavController);

router.patch("/users/", addToUserPostsController);

router.patch("/users/friends/", addToUserFriendsController);

router.patch("/users/posts/", replacePostController);

router.delete("/users/posts/", deletePostController);

router.delete("/users/friends/", deleteFriendController);

module.exports = router;
