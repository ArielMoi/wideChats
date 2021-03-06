const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const Chat = require("./src/models/chat");
const DirectChat = require("./src/models/directChat");

// socket.io -
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//routers
const usersRouter = require("./src/routers/user");
const chatsRouter = require("./src/routers/chat");
const directChatsRouter = require("./src/routers/directChat");

const publicDirectory = path.join(__dirname, "../client/build");

require("./src/db/mongoose");

app.use(express.json());
app.use(express.static(publicDirectory));
app.use(cors());
app.use(usersRouter);
app.use(chatsRouter);
app.use(directChatsRouter);

const PORT = process.env.PORT || 5000;
let currentRoom;
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("join", async ({ room, username }) => {
    socket.join(room);
    currentRoom = room;
    io.to(room).emit("userJoined", username);
    await Chat.findOneAndUpdate(
      { name: room },
      { $push: { participants: username } }
    );
  });

  socket.on("sendMessage", async (message) => {
    io.to(message.room).emit("message", message);
    if (message.direct) {
      await DirectChat.findOneAndUpdate(
        { name: currentRoom },
        { $push: { messages: message } }
      );
    } else {
      await Chat.findOneAndUpdate(
        { name: currentRoom },
        { $push: { messages: message } }
      );
    }
  });

  socket.on("sendLocation", async (message) => {
    io.to(message.room).emit("locationMessage", message);
    await Chat.findOneAndUpdate(
      { name: currentRoom },
      { $push: { messages: message } }
    );
  });

  socket.on("disconnected", async ({ room, username }) => {
    const chat = await Chat.findOne({ name: room });
    if (chat) {
      chat.participants = [...new Set(chat.participants)].filter(
        (user) => user !== username
      );
      await chat.save();
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
