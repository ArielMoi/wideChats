// import { protocol } from "socket.io-parser";
import ChatMessage from "../ChatMessage/ChatMessage.Component";
import ChatTextInput from "../ChatTextInput/ChatTextInput.Component";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import date from "date-and-time";

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('')

  useEffect(() => {
    // ? have to be inside use effect or can be outside
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  });

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", {
      text: currentMessage,
      username: props.username,
      time: date.format(new Date(), "DD/MM HH:mm"),
      room: props.currentRoom,
    });
    setCurrentMessage("");
  };

  return (
    <div className="chat-window" style={{ visibility: props.visibility }}>
      {messages &&
        messages.map((message) => (
          <ChatMessage
            username={message.username}
            time={message.time}
            text={message.text}
          />
        ))}
      <ChatTextInput
        onChange={(e) => setCurrentMessage(e.target.value)}
        msgValue={currentMessage}
        onClick={sendMessage}
      />
    </div>
  );
};

export default Chat;
