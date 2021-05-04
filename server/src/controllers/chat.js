const Chat = require("../models/chat");

const {
  addChat,
  getChat,
  getAllChats,
  getAllUserChats,
} = require("../utils/chat");

const addChatController = async (req, res) => {
  try {
    const chat = await addChat(req.body.name, req.body.creator);
    res.status(200).send(chat);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getChatController = async (req, res) => {
  try {
    if (req.query.user) {
      // for specific user chats
      const userChats = await getAllUserChats(req.query.user);
      return res.status(200).send(userChats);
    }
    const chat = await getChat(req.params.id);
    res.status(200).send(chat);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getAllChatsController = async (req, res) => {
  try {
    const chats = await getAllChats();
    res.status(200).send(chats);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// const getAllUserChatsController = async (req, res) => {
//   try {
//     const userChats = await getAllUserChats(req.body._id);
//     res.status(200).send(userChats);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// };

module.exports = {
  addChatController,
  getChatController,
  getAllChatsController,
};
