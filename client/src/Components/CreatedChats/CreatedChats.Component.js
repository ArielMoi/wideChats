import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

const CreatedChats = ({ user, chats, setCurrentRoom, enterChat, addToFav }) => {
  const [createdChats, setCreatedChats] = useState([]);
  const history = useHistory();

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
    <div>
      <h1>Created Chats</h1>
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
