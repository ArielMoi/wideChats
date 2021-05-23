import ChatMessage from "../ChatMessage/ChatMessage.Component";
import LocationMessage from "../LocationMessage/LocationMessage.Component";
import ChatTextInput from "../ChatTextInput/ChatTextInput.Component";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import date from "date-and-time";
import { v4 as uuid } from "uuid";
import "./Chat.css";
import { origin, socketUri } from "../../cors"; // for dev or production
import { useParams } from "react-router-dom";
import API from "../../API";
import ParticipantsShowcase from "../ParticipantsShowcase/ParticipantsShowcase.Component";

const socket = openSocket(socketUri, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [addedParticipants, setAddedParticipants] = useState([props.room.participants])
  const { friendName } = useParams();

  socket.on("message", (message) => {
    if (props.username === message.username) {
      message.sent = true;
      setMessages([...messages, message]);
    } else {
      message.sent = false;
      setMessages([...messages, message]);
    }
  });

  socket.on("locationMessage", (message) => {
    setMessages([...messages, message]);
  });

  socket.on("userJoined", (username) => {
    setAddedParticipants([...addedParticipants, username]);
  });

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", {
      text: currentMessage,
      username: props.username,
      time: date.format(new Date(), "DD/MM HH:mm"),
      room: props.room.name,
      direct: props.room === "direct",
    });

    setCurrentMessage("");
  };

  const sendLocation = (event) => {
    event.preventDefault();
    if (!navigator.geolocation) {
      // check if browser has geolocation support
      return alert("geolocation isn`t supported");
    }
    console.log("activated");
    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit("sendLocation", {
        coords: `http://google.com/maps/?q=${position.coords.latitude},${position.coords.longitude}`,
        room: props.room.name,
        username: props.username,
        time: date.format(new Date(), "DD/MM HH:mm"),
        direct: props.room === "direct",
      });
    });
  };

  useEffect(() => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  });

  useEffect(() => {
    if (props.room !== "direct") {
      const chat = props.chats.find((chat) => chat.name === props.room.name);
      if (currentRoom !== props.room.name) {
        setCurrentRoom(props.room);
        setMessages([
          {
            username: "Admin",
            text: `you entered room - ${props.room.name}`,
            time: "",
          },
          ...chat.messages,
        ]);
      }
    } else {
      const startDirectChat = async () => {
        let room = [friendName, props.username].sort().join("");

        let roomData;
        try {
          const { data } = await API.get(`/direct-chats/${room}`);
          roomData = data;
        } catch (e) {
          // case of first direct message
          console.log(e);
          const { data } = await API.post(`/direct-chats`, {
            participants: [friendName, props.username],
          });
          roomData = data;
        }

        setCurrentRoom(room);
        setMessages([
          {
            username: "Admin",
            text: `you in a direct chat with - ${friendName}`,
            time: "",
          },
          ...roomData.messages,
        ]);
      };

      startDirectChat();
    }
    console.log(props.room.name);
    socket.emit("join", { room: props.room.name, username: props.username });
  }, [props.room, currentRoom]);

  useEffect(() => {
    return () =>
      socket.emit("disconnected", {
        room: props.room.name,
        username: props.username,
      });
  }, []);

  return (
    <div className="chat-window">
      {messages &&
        messages.map((message) =>
          message.text ? (
            <ChatMessage
              username={message.username}
              time={message.time}
              text={message.text}
              key={uuid()}
              messageSent={message.sent}
            />
          ) : (
            <LocationMessage
              username={message.username}
              time={message.time}
              coords={message.coords}
              key={uuid()}
            />
          )
        )}
      <ChatTextInput
        onChange={(e) => setCurrentMessage(e.target.value)}
        msgValue={currentMessage}
        onClick={sendMessage}
        shareLocation={sendLocation}
      />
      {/* <div className="participants">
        <ParticipantsShowcase
          participants={addedParticipants}
        />
      </div> */}
    </div>
  );
};

export default Chat;
