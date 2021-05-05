import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import ChatShowcase from "../src/Components/ChatShowcase/ChatShowcase.Component";
import Chat from "./Components/Chat/Chat.Component";
import Login from "./Components/Login/Login.Component";
// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [chats, setChats] = useState([]);
  const [chatVisibility, setChatVisibility] = useState("hidden");
  const [currentRoom, setCurrentRoom] = useState({});

  // state for all messages

  useEffect(() => {
    const collectChats = async () => {
      const arrayOfChats = [];
      const { data } = await axios.get("http://localhost:5000/chats/");
      data.map((chat) => arrayOfChats.push(Object.values(chat)));
      setChats(arrayOfChats);
    };
    collectChats();
  }, []);

  const enterChat = (room) => {
    setChatVisibility("visible");
    setCurrentRoom(room)
  };

  // chat will be hidden until enter
  return (
    <div>
      <Login />
      {chats.map((chat) => (
        <ChatShowcase chatName={chat[2]} enterFunc={enterChat} /> // create a func to open chat to the correct room when "enter"
      ))}
      <Chat currentRoom={currentRoom} visibility={chatVisibility}/>
    </div>
  );
};

export default App;
