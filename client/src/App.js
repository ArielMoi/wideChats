import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import ChatShowcase from "../src/Components/ChatShowcase/ChatShowcase.Component";

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const collectChats = async () => {
      const arrayOfChats = [];
      const { data } = await axios.get("http://localhost:5000/chats/");
      data.map((chat) => arrayOfChats.push(Object.values(chat)));
      setChats(arrayOfChats);
    };
    collectChats();
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", msg);
  };

  return (
    <div>
      {chats.map((chat) => (
        <ChatShowcase chatName={chat[2]} />
      ))}
      <form>
        <input type="text" onChange={(e) => setMsg(e.target.value)} />
        <button onClick={sendMessage}>send</button>
      </form>
    </div>
  );
};

export default App;
