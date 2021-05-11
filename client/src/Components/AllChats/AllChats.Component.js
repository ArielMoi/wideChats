import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import ChatsShowcaseHeader from "../ChatsShowcaseHeader/ChatsShowcaseHeader.Component";
import { v4 as uuid } from "uuid";
import "./AllChats.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const AllChats = ({ chats, enterChat, addToFav }) => {
  const history = useHistory();
  const [searchChats, setSearchChats] = useState([]);
  const [searchByType, setSearchByType] = useState(false);

  return (
    <div className="chats-showcase">
      <h1>Chats</h1>
      <ChatsShowcaseHeader
        setSearchChats={setSearchChats}
        searchByType={searchByType}
        setSearchByType={setSearchByType}
        chats={chats}
      />
      {searchChats.map((chat) => (
        <ChatShowcase
          key={uuid()}
          chatName={chat.name}
          enterFunc={() => {
            enterChat(chat);
            history.push("/chat");
          }}
          addToFav={addToFav}
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
          addToFav={addToFav}
          tag={chat.type}
        />
      ))}
    </div>
  );
};

export default AllChats;
