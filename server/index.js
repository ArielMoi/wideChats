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

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("join", room => {
    socket.join(room);
  })

  socket.on("sendMessage", (message) => {
    socket.join(message.room);
    io.to(message.room).emit("message", message);
  });

  socket.on("sendLocation", (message) => {
    io.to(message.room).emit("locationMessage", message);
  });
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));