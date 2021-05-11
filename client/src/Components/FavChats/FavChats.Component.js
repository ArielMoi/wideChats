import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

const FavChats = ({ user, chats, setCurrentRoom, enterChat, addToFav }) => {
  const [favChats, setFavChats] = useState([]);
  const history = useHistory();

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
    <div>
      <h1>Favorite Chats</h1>
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
