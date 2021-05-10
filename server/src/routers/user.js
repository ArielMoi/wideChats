const {
  addUserController,
  getUserController,
  getAllUsersController,
  addToUserFavController,
} = require("../controllers/user");
const express = require("express");
const router = new express.Router();

router.get("/users/", getAllUsersController);

router.get("/users/:name", getUserController);

router.post("/users/", addUserController);

router.post("/users/:name/:chat", addToUserFavController);

module.exports = router;
