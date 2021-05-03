const Chat = require("../models/chat");

const {
  addChat,
  getChat,
  getAllChats,
  getAllUserChats,
} = require("../utils/chat");

const addChatController = async (res, req) => {
  try {
    const chat = await addChat(req.body);
    res.status(200).send(chat);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getChatController = async (res, req) => {
  try {
    if (req.query.user) {
      // for specific user chats
      const userChats = await getAllUserChats(req.query.user);
      return res.status(200).send(userChats);
    }
    const chat = await getChat(req.body._id);
    res.status(200).send(chat);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getAllChatsController = async (res, req) => {
  try {
    const chats = await getAllChats();
    res.status(200).send(chats);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// const getAllUserChatsController = async (res, req) => {
//   try {
//     const userChats = await getAllUserChats(req.body._id);
//     res.status(200).send(userChats);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// };

module.export = {
  addChatController,
  getChatController,
  getAllChatsController,
//   getAllUserChatsController,
};
