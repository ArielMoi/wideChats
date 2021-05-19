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

const removeChat = async (chatName) => {
  return await Chat.findOneAndDelete({name: chatName})
}

module.exports = {
  addChat,
  getChat,
  getAllChats,
  getAllUserChats,
  removeChat,
};
