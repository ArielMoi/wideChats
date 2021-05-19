const {
  addChatController,
  getChatController,
  getAllChatsController,
  removeChatController,
} = require("../controllers/chat");
const express = require("express");
const router = new express.Router();

router.get("/chats/", getAllChatsController);

router.get("/chats/:id", getChatController);

router.post("/chats/", addChatController);

router.delete("/chats/:name", removeChatController);

module.exports = router;