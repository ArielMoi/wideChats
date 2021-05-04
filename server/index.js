const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// socket.io -
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app); // creating the server outside of the express library to later connect it to socket io
const io = socketio(server);

//routers
const usersRouter = require('./src/routers/user')
const chatsRouter = require('./src/routers/chat')

const publicDirectory = path.join(__dirname, '../client/build');

require('./src/db/mongoose')

//! app.use(cors()) MUST be BEFORE using routers
app.use(express.json());
app.use(express.static(publicDirectory));
app.use(cors());
app.use(usersRouter);
app.use(chatsRouter);

const PORT = process.env.PORT || 5000;



io.on('connection', socket => {
    console.log('new webSocket connection');
    
    // socket on join

    // message

    // send location

    // disconnect
})


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
