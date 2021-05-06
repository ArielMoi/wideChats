import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import ChatShowcase from "../src/Components/ChatShowcase/ChatShowcase.Component";
import Chat from "./Components/Chat/Chat.Component";
import Login from "./Components/Login/Login.Component";
// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CreateRoom from "./Components/CreateRoom/CreateRoom.Component";
import Qs from "qs";
import { v4 as uuid } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";
// import LocationMessage from './Components/LocationMessage/LocationMessage.Component'
import Logout from './Components/Logout/Logout.Component'

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [chats, setChats] = useState([]);
  const [chatVisibility, setChatVisibility] = useState("hidden");
  const [currentRoom, setCurrentRoom] = useState({});
  const [currentUser, setCurrentUser] = useState("");
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
    const { username } = Qs.parse(window.location.search, {
      // collects user name from login form
      ignoreQueryPrefix: true,
    });
    setCurrentUser(username);
  }, []);

  const enterChat = (chat) => {
    console.log(user);
    isAuthenticated && console.log(user);
    setChatVisibility("visible");
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

  // chat will be hidden until enter
  return (
    <div>
      {isAuthenticated ? <Logout /> : <Login />}
      {/* <LocationMessage /> */}
      <CreateRoom createRoomButton={createRoom} user={currentUser} />
      {chats.map((chat) => (
        <ChatShowcase
          key={uuid()}
          chatName={chat.name}
          enterFunc={() => enterChat(chat)}
          tag={chat.type}
        /> // create a func to open chat to the correct room when "enter"
      ))}
      <Chat
        visibility={chatVisibility}
        username={
          currentRoom.isAnonymous ? "Anonymous" : user ? user.nickname : ""
        }
        room={currentRoom}
      />
    </div>
  );
};

export default App;
