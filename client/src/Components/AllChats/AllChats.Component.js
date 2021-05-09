import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import { v4 as uuid } from "uuid";
import "./AllChats.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const AllChats = ({ chats, enterChat, setChats }) => {
  const history = useHistory();
  const [tempChats, setTempChats] = useState(chats);
  const [searchByType, setSearchByType] = useState(false)

  const search = (input) => {
    const a = searchByType ? chats.filter((chat) => chat.type.startsWith(input)) : chats.filter((chat) => chat.name.startsWith(input));
    input !== "" ? setTempChats(a) : setTempChats(chats);
  };

  return (
    <div className="chats-showcase">
      <div className="headers">
        <h1>Chats</h1>
        <input type="text" onChange={(event) => search(event.target.value)} />
        <i className="fas fa-search"></i>
        < input type='checkbox' onChange={() => setSearchByType(!searchByType)} value={searchByType}/>
        <label> by type</label>
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
