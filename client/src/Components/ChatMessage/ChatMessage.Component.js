import "./ChatMessage.css";
import { useRef, useEffect, useState } from "react";

const ChatMessage = (props) => {
  const messageRef = useRef();

  // useEffect(() => {
  //   if (props.messageSent){
  //     console.log('own user');
  //     console.log(messageRef);
  //     messageRef.style.backgroundColor = 'white'
  //     // setMsgClass(msgClass + ' left')
  //     // messageRef.background = 'blue';
  //   }
  // }, []);

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
