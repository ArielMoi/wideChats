import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import ChatShowcase from "../src/Components/ChatShowcase/ChatShowcase.Component";
import Chat from './Components/Chat/Chat.Component'

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);
  const [chatVisibility, setChatVisibility] = useState('hidden')
  const [messages, setMessages] = useState([])
  const [currentChat, setCurrentChat] = useState({})
  
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

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", {text: msg, username: 'ariel', time: Date.now()}); // add msg to state of all messages
  };

  const enterChat = (room) => {
    setChatVisibility('visible')
  }

 // chat will be hidden until enter
  return (
    <div>
      {chats.map((chat) => (
        <ChatShowcase chatName={chat[2]} /> // create a func to open chat to the correct room when "enter"
      ))}
      < Chat visibility={'visible'} messages={messages}/>
      <form>
        <input type="text" onChange={(e) => setMsg(e.target.value)} />
        <button onClick={sendMessage}>send</button>
      </form>
    </div>
  );
};

export default App;
