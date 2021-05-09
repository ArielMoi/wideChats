import ChatMessage from "../ChatMessage/ChatMessage.Component";
import LocationMessage from "../LocationMessage/LocationMessage.Component";
import ChatTextInput from "../ChatTextInput/ChatTextInput.Component";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import date from "date-and-time";
import { v4 as uuid } from "uuid";
import "./Chat.css";

const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");

  socket.on("message", (message) => {
    setMessages([...messages, message]);
  });

  socket.on("locationMessage", (message) => {
    console.log(message);
    setMessages([...messages, message]);
  });

  useEffect(() => {
    if (currentRoom !== props.room.name) {
      console.log("room change");
      setCurrentRoom(props.room);
      setMessages([
        {
          username: "Admin",
          text: `you entered room - ${props.room.name}`,
          time: "",
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

  useEffect(() => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  });

  const sendLocation = (event) => {
    event.preventDefault()
    if (!navigator.geolocation) {
      // check if browser has geolocation support
      return alert("geolocation isn`t supported");
    }
    console.log('activated');
    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit("sendLocation", {
        coords: `http://google.com/maps/?q=${position.coords.latitude},${position.coords.longitude}`,
        room: props.currentRoom,
        username: props.username,
        time: date.format(new Date(), "DD/MM HH:mm"),
      });
    });
  };

  return (
    <div className="chat-window">
      {messages &&
        messages.map((message) => (
          message.text ? <ChatMessage
            username={message.username}
            time={message.time}
            text={message.text}
            key={uuid()}
          /> :
          <LocationMessage 
            username={message.username}
            time={message.time}
            coords={message.coords}
            key={uuid()}
            />
        ))}
      <ChatTextInput
        onChange={(e) => setCurrentMessage(e.target.value)}
        msgValue={currentMessage}
        onClick={sendMessage}
        shareLocation={sendLocation}
      />
    </div>
  );
};

export default Chat;
