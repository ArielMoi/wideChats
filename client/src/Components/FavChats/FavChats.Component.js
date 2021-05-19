import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import ChatsShowcaseHeader from "../ChatsShowcaseHeader/ChatsShowcaseHeader.Component";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import API from "../../API";

const FavChats = ({ user, chats, enterChat, setChats }) => {
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

  const removeFromFavorites = async (favoriteToDelete) => {
    await API.delete("/users/favorites/", {
      data: {
        username: user.name,
        favoriteToDelete,
      },
    });

    const arrayOfChats = chats.filter(
      (chat) =>
        user.favoriteChats.includes(chat.name) && chat.name !== favoriteToDelete
    );

    setChats(chats.filter((chat) => chat.name !== favoriteToDelete));
    setFavChats(arrayOfChats);
  };

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
          removeFromFav={removeFromFavorites}
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
          removeFromFav={removeFromFavorites}
          s
          tag={chat.type}
        />
      ))}
    </div>
  );
};

export default FavChats;
