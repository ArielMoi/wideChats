const {
  addChatController,
  getChatController,
  getAllChatsController,
} = require("../controllers/chat");
const express = require("express");
const router = new express.Router();

router.get("/chats/", getAllChatsController);

router.get("/chats/:id", getChatController);

router.post("/chats/", addChatController);

module.exports = router;