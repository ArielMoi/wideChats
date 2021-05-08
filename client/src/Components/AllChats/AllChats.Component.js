import ChatShowcase from "../ChatShowcase/ChatShowcase.Component";
import { v4 as uuid } from "uuid";
import "./AllChats.css";
import { useHistory } from "react-router-dom";

const AllChats = ({ chats, enterChat }) => {
  const history = useHistory();
  return (
    <div className="chats-showcase">
      <div className="headers">
        <h1>Chats</h1>
        <input type="text" />
        <i className="fas fa-search"></i>
      </div>
      {chats.map((chat) => (
        <ChatShowcase
          key={uuid()}
          chatName={chat.name}
          enterFunc={() => {
            enterChat(chat);
            history.push("/chat");
          }}
          tag={chat.type}
        /> // create a func to open chat to the correct room when "enter"
      ))}
    </div>
  );
};

export default AllChats;
