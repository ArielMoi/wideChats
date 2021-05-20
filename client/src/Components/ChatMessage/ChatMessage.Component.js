import "./ChatMessage.css";
import { useRef, useEffect } from "react";

const ChatMessage = (props) => {
  const messageRef = useRef();

  useEffect(() => {
    // console.log(messageRef);
    // console.log(props.message.sent);
    // if (props.message.sent) {
    //   messageRef.style.background = "blue";
    // }
  }, []);

  return (
    <div className="msg" ref={messageRef}>
      <p style={{ fontSize: "0.8rem" }}>
        <b className="username">{props.username} </b> {props.time}
      </p>
      <p className="text">{props.text}</p>
    </div>
  );
};

export default ChatMessage;
