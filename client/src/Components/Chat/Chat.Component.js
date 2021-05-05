import { protocol } from "socket.io-parser";
import ChatMessage from "../ChatMessage/ChatMessage.Component";
import ChatTextInput from "../ChatTextInput/ChatTextInput.Component";

const Chat = (props) => {
  return (
    <div className="chat-window" style={{visibility: props.visibility}}>
      {props.messages &&
        props.messages.map((msg) => (
          <ChatMessage
            username={msg.username}
            time={msg.time}
            text={msg.text}
          />
        ))}
      <ChatTextInput />
    </div>
  );
};

export default Chat;
