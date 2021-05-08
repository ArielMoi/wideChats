import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import { v4 as uuid } from "uuid";
import "./AllChats.css";
import { useHistory } from "react-router-dom";
import {useState} from 'react';

const AllChats = ({ chats, enterChat, setChats }) => {
  const history = useHistory();
  const [tempChats, setTempChats] = useState([]);

  const search = (input) => {
    console.log(input);
    // setTempChats(chats)
    setTempChats(
      chats.filter((chat) => {
        chat.name.startsWith(input);
      })
    );
  } 

  return (
    <div className="chats-showcase">
      <div className="headers">
        <h1>Chats</h1>
        <input type="text" onChange={(event) => search(event.target.value)} />
        <i className="fas fa-search"></i>
      </div>
      {tempChats.map((chat) => (
        <ChatShowcase
          key={uuid()}
          chatName={chat.name}
          enterFunc={() => {
            enterChat(chat);
            history.push("/chat");
          }}
          tag={chat.type}
        />
      ))}
      {chats.map((chat) => (
        <ChatShowcase
          key={uuid()}
          chatName={chat.name}
          enterFunc={() => {
            enterChat(chat);
            history.push("/chat");
          }}
          tag={chat.type}
        />
      ))}
    </div>
  );
};

export default AllChats;
