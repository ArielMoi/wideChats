// import { protocol } from "socket.io-parser";
import ChatMessage from "../ChatMessage/ChatMessage.Component";
import ChatTextInput from "../ChatTextInput/ChatTextInput.Component";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


const Chat = (props) => {
  // chat details
  const [msg, setMsg] = useState([]);
  // logics of socket io.

  // set messages and messages from App

  //socket io each message added to messages

  useEffect(() => { // ? have to be inside use effect or can be outside
    socket.on("message", (message) => {
      setMsg([...msg, message]);
    });
  });

  return (
    <div className="chat-window" style={{ visibility: props.visibility }}>
      {msg &&
        msg.map((msg) => (
          <ChatMessage
            username={msg.username}
            time={msg.time}
            text={msg.text}
          />
        ))}
      <ChatTextInput />
    </div>
  );
};

export default Chat;
