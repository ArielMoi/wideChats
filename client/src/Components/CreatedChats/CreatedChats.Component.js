import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import ChatsShowcaseHeader from "../ChatsShowcaseHeader/ChatsShowcaseHeader.Component";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

const CreatedChats = ({ user, chats, setCurrentRoom, enterChat, addToFav }) => {
  const [createdChats, setCreatedChats] = useState([]);
  const history = useHistory();
  const [searchChats, setSearchChats] = useState([]);
  const [searchByType, setSearchByType] = useState(false);

  useEffect(() => {
    const collectCreatedChats = async () => {
      const arrayOfChats = [];
      chats.forEach(
        (chat) =>
          user.createdChats.includes(chat.name) && arrayOfChats.push(chat)
      );
      setCreatedChats(arrayOfChats);
    };

    collectCreatedChats();
  }, []);

  return (
    <div className="chats-showcase">
      <h1>Created Chats</h1>
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
      {createdChats.map((chat) => (
        <ChatShowcase
          key={uuid()}
          chatName={chat.name}
          enterFunc={() => {
            enterChat(chat);
            history.push("/chat");
          }}
          addToFav={addToFav} // ! -- need to be remove from fav
          tag={chat.type}
        />
      ))}
    </div>
  );
};

export default CreatedChats;
