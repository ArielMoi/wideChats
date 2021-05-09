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
import AllChats from "./Components/AllChats/AllChats.Component";
import UserNotLogged from "./Components/UserNotLogged/UserNotLogged.Component";
import { origin, socketUri } from "./cors"; // for dev or production

const socket = openSocket(origin, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [chats, setChats] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profileExists, setProfileExists] = useState(false)

  // state for all messages
  const collectChats = async () => {
    const arrayOfChats = [];
    const { data } = await axios.get(`${origin}/chats/`);
    data.map((chat) => arrayOfChats.push(chat));
    setChats(arrayOfChats);
  };

  useEffect(() => {
    collectChats();
  }, []);

  useEffect(() => {
    if (isAuthenticated && !profileExists){
      createProfile(user);
      console.log(user);
      setProfileExists(true)
    }
  });

  const enterChat = (chat) => {
    console.log(user);
    setCurrentRoom(chat);
    socket.emit("join", chat.name); // join user to his choice of room
  };

  const createRoom = async (name, creator, isAnonymous, type = "general") => {
    const { data } = await axios.post(`${origin}/chats/`, {
      name,
      creator,
      isAnonymous,
      type,
    });
    collectChats(); // to renew chats list
    return data;
  };

  const createProfile = async (user) => {
    const profile = await axios.post(`${origin}/users/`, {
      name: user.nickname,
      email: user.email
    });

    return profile;
  }

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
          {/* {isAuthenticated ? ( */}
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
          {/* ) : (
            <UserNotLogged />
          )} */}
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
