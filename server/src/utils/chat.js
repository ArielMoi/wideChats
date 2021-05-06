const Chat = require("../models/chat");

const addChat = async (name, creator, isAnonymous = false, type='general') => {
  try {
    const chat = new Chat({
      name,
      creator,
      isAnonymous,
      type,
    });
    await chat.save();
    return chat;
  } catch (e) {
    console.log(e);
  }
};

const getChat = async (id) => {
  return await Chat.findById(id);
};

const getAllChats = async () => {
  return await Chat.find({});
};

const getAllUserChats = async (userId) => {
  return await Chat.find({ creator: userId });
};

// getChat("608fdfc61adbc95b2cedbfca").then(chat => console.log(chat))
// getAllChats().then(chats => console.log(chats))
// addChat('ariel', 'ariel@gmail.com')

module.exports = {
  addChat,
  getChat,
  getAllChats,
  getAllUserChats,
};
