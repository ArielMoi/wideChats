import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import Chat from "./Components/Chat/Chat.Component";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CreateRoom from "./Components/CreateRoom/CreateRoom.Component";
import Button from "./Components/Button/Button.Component";
import Navbar from './Components/Navbar/Navbar.Component'

import { useAuth0 } from "@auth0/auth0-react";
// import LocationMessage from './Components/LocationMessage/LocationMessage.Component'
import AllChats from "./Components/AllChats/AllChats.Component";
import UserNotLogged from "./Components/UserNotLogged/UserNotLogged.Component";
import currentOrigin from './cors' // for dev or production

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: currentOrigin,
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [chats, setChats] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth0();

  // state for all messages
  const collectChats = async () => {
    const arrayOfChats = [];
    const { data } = await axios.get("http://localhost:5000/chats/");
    data.map((chat) => arrayOfChats.push(chat));
    setChats(arrayOfChats);
  };

  useEffect(() => {
    collectChats();
  }, []);

  const enterChat = (chat) => {
    setCurrentRoom(chat);
    socket.emit("join", chat.name); // join user to his choice of room
  };

  const createRoom = async (name, creator, isAnonymous, type = "general") => {
    const { data } = await axios.post("http://localhost:5000/chats/", {
      name,
      creator,
      isAnonymous,
      type,
    });
    collectChats(); // to renew chats list
    return data;
  };

  return (
    <div>
      <BrowserRouter>
        <Route path="/">
          <Navbar isAuthenticated={isAuthenticated} />
        </Route>
        <Route path="/" exact>
          <Link to="/create-room" className="btn-create">
            <Button text="Create Rooom" />
          </Link>
          <AllChats chats={chats} enterChat={enterChat} setChats={setChats}/>
        </Route>
        <Route path="/create-room" exact>
          {isAuthenticated ? (
            <CreateRoom
              createRoomButton={createRoom}
              user={user ? user.nickname : ""}
            />
          ) : (
            <UserNotLogged />
          )}
        </Route>
        <Route path="/chat" exact>
          {isAuthenticated ? (
            <Chat
              username={
                currentRoom.isAnonymous
                  ? "Anonymous"
                  : user
                  ? user.nickname
                  : ""
              }
              room={currentRoom}
            />
          ) : (
            <UserNotLogged />
          )}
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
