// import { protocol } from "socket.io-parser";
import ChatMessage from "../ChatMessage/ChatMessage.Component";
import ChatTextInput from "../ChatTextInput/ChatTextInput.Component";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import date from "date-and-time";
import { v4 as uuid } from "uuid";

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState('');

  socket.on("message", (message) => {
    setMessages([...messages, message]);
  });

  useEffect(() => {
    if (currentRoom !== props.room.name){
      console.log('room change');
      setCurrentRoom(props.room)
      setMessages([
        {
          username: "Admin",
          text: `you entered room - ${props.room.name}`,
          time: '',
        },
      ]);
    }
  }, [props.room, currentRoom]);

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
            key={uuid()}
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
