const {
  addDirectChatController,
  getDirectChatController,
  getAllDirectChatsController,
} = require("../controllers/directChat");
const express = require("express");
const router = new express.Router();

router.get("/direct-chats/", getAllDirectChatsController);

router.get("/direct-chats/:name", getDirectChatController);

router.post("/direct-chats/", addDirectChatController);

module.exports = router;
