import React from "react";

// import Login from "./Components/Login/Login.Component";

import "./App.css";
import { useState } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000", {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [msg, setMsg] = useState("");

  const send = (event) => {
    event.preventDefault();
    // console.log(msg);
    socket.emit("sendMessage", msg);
  };

  return (
    <div>
      <form>
        <input type="text" onChange={(e) => setMsg(e.target.value)} />
        <button onClick={send}>send</button>
      </form>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";

// import openSocket from "socket.io-client";
// const socket = openSocket("http://localhost:5000");

// function App() {
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     socket.on("FromAPI", (data) => {
//       setResponse(data);
//     });
//   }, []);

//   return (
//     <p>
//       It's <time dateTime={response}>{response}</time>
//     </p>
//   );
// }

// export default App;
