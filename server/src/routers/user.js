const { addUserController, getUserController, getAllUsersController } = require('../controllers/user')
const express = require("express");
const router = new express.Router();

router.get("/users/", getAllUsersController);

router.get("/users/:id", getUserController);

router.post("/users/", addUserController);

module.exports = router;
