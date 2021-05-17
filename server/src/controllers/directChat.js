const Chat = require("../models/chat");

const {
  addDirectChat,
  getDirectChat,
  getAllDirectChats,
} = require("../utils/directChat");

const addDirectChatController = async (req, res) => {
  try {
    const chat = await addDirectChat(req.body.participants);
    res.status(200).send(chat);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getDirectChatController = async (req, res) => {
  try {
    if (req.query.user) {
      // for specific user chats
      const userChats = await getDirectChat(req.params.name);
      return res.status(200).send(userChats);
    }
    const chat = await getChat(req.params.id);
    res.status(200).send(chat);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getAllDirectChatsController = async (req, res) => {
  try {
    const chats = await getAllDirectChats();
    res.status(200).send(chats);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  addDirectChatController,
  getDirectChatController,
  getAllDirectChatsController,
};
