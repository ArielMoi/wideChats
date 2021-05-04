const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// socket.io -
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io")
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


//routers
const usersRouter = require("./src/routers/user");
const chatsRouter = require("./src/routers/chat");

const publicDirectory = path.join(__dirname, "../client/build");

require("./src/db/mongoose");

app.use(express.json());
app.use(express.static(publicDirectory));
app.use(cors());
app.use(usersRouter);
app.use(chatsRouter);

const PORT = process.env.PORT || 5000;

const {
  generateMessage,
  generateLocationMessage,
} = require("./src/utils/messages"); // messages utils

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  
  // socket.on("join", (user, callback) => {
  //   socket.join(user.room);

  //   socket.emit("message", generateMessage("Admin", "Welcome!"));
  //   socket.broadcast
  //     .to(user.room)
  //     .emit(
  //       "message",
  //       generateMessage("Admin", `${user.username} has joined!`)
  //     );
  //   io.to(user.room).emit("roomData", {
  //     room: user.room,
  //     users: getUsersInRoom(user.room),
  //   });

  //   callback();
  // });

  socket.on("sendMessage", (message) => {
    console.log(message);

    // io.to(user.room).emit("message", generateMessage(user.username, message));
  });

  // socket.on("sendLocation", ({ coords, user }, callback) => {
  //   io.to(user.room).emit(
  //     "locationMessage",
  //     generateLocationMessage(
  //       user.username,
  //       `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
  //     )
  //   );
  //   callback();
  // });

  // socket.on("disconnect", () => {
  //   io.to(user.room).emit(
  //     "message",
  //     generateMessage("Admin", `${user.username} has left!`)
  //   );
  //   io.to(user.room).emit("roomData", {
  //     room: user.room,
  //     users: getUsersInRoom(user.room),
  //   });
  // });
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));