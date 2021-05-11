import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import ChatsShowcaseHeader from "../ChatsShowcaseHeader/ChatsShowcaseHeader.Component";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

const FavChats = ({ user, chats, setCurrentRoom, enterChat, addToFav }) => {
  const [favChats, setFavChats] = useState([]);
  const history = useHistory();
  const [searchChats, setSearchChats] = useState([]);
  const [searchByType, setSearchByType] = useState(false);
  
  useEffect(() => {
    const collectFavChats = async () => {
      const arrayOfChats = [];
      chats.forEach(
        (chat) =>
          user.favoriteChats.includes(chat.name) && arrayOfChats.push(chat)
      );
      setFavChats(arrayOfChats);
    };

    collectFavChats();
  }, []);

  return (
    <div className="chats-showcase">
      <h1>Favorite Chats</h1>
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
      {favChats.map((chat) => (
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

export default FavChats;
