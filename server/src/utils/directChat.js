const DirectChat = require("../models/directChat");

const addDirectChat = async (participants) => {
  try {
    const chat = new DirectChat({
      name: participants.sort().join('')
    });
    await chat.save();
    return chat;
  } catch (e) {
    console.log(e);
  }
};

const getDirectChat = async (name) => {
  return await DirectChat.findOne({ name });
};

const getAllDirectChats = async () => {
  return await DirectChat.find({});
};

module.exports = {
  addDirectChat,
  getDirectChat,
  getAllDirectChats,
};
