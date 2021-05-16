import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import Chat from "./Components/Chat/Chat.Component";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CreateRoom from "./Components/CreateRoom/CreateRoom.Component";
import Button from "./Components/Button/Button.Component";
import Navbar from "./Components/Navbar/Navbar.Component";
import FavChats from "./Components/FavChats/FavChats.Component";
import CreatedChats from "./Components/CreatedChats/CreatedChats.Component";
import Profile from "./Components/Profile/Profile.Component";

import { useAuth0 } from "@auth0/auth0-react";
import AllChats from "./Components/AllChats/AllChats.Component";
import UserNotLogged from "./Components/UserNotLogged/UserNotLogged.Component";
import { origin, socketUri } from "./cors"; // for dev or production
import API from "./API";

const socket = openSocket(socketUri, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

const App = () => {
  const [chats, setChats] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState("");

  const collectChats = async () => {
    const arrayOfChats = [];
    const { data } = await API.get(`/chats/`);
    data.forEach((chat) => arrayOfChats.push(chat));
    setChats(arrayOfChats);
  };

  useEffect(() => {
    collectChats();
  }, []);

  const checkIfProfileExists = async () => {
    const { data } = await API.get(`/users/${user.nickname}`);
    return data !== "";
  };

  const CheckAndCreateProfile = async () => {
    // checks if profile (user data in db) exists. (if first login). pull or creates data.
    const profileExists = await checkIfProfileExists();
    if (!profileExists) {
      const { data } = await createProfile(user);
      setUserData(data[0]);
    } else {
      const { data } = await API.get(`/users/${user.nickname}`);
      setUserData(data[0]);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !userData) {
      CheckAndCreateProfile();
    }
  });

  const enterChat = (chat) => {
    setCurrentRoom(chat);
    socket.emit("join", { chat, userData }); // join user to his choice of room
  };

  const createRoom = async (name, creator, isAnonymous, type) => {
    if (type === "") {
      type = "general";
    }
    const { data } = await API.post(`/chats/`, {
      name,
      creator,
      isAnonymous,
      type,
    });
    collectChats(); // to renew chats list
    addToCreated(creator, name);
    return data;
  };

  const createProfile = async (user) => {
    const profile = await API.post(`/users/`, {
      name: user.nickname,
      email: user.email,
    });

    return profile;
  };

  const addToFav = async (chat) => {
    console.log(user);
    user && (await API.post(`/users/${user.nickname}/${chat}`));
    const { data } = await API.get(`/users/${user.nickname}`); // to updated created chats
    setUserData(data[0]);
  };

  const addToCreated = async (user, chat) => {
    await API.post(`/users/${user}/${chat}/?created=true`);
    const { data } = await API.get(`/users/${user.nickname}`); // to updated created chats
    setUserData(data[0]);
  };

  return (
    <div>
      <BrowserRouter>
        <Route path="/">
          <Navbar isAuthenticated={isAuthenticated} user={user && user} />
        </Route>
        <Route path="/" exact>
          <Link to="/create-room" className="btn-create">
            <Button text="Create Room" />
          </Link>
          <AllChats
            chats={chats}
            enterChat={enterChat}
            setChats={setChats}
            addToFav={addToFav}
          />
        </Route>
        <Route path="/create-room" exact>
          {isAuthenticated ? (
            <CreateRoom
              createRoomButton={createRoom}
              user={user ? user.nickname : ""}
            />
          ) : (
            <UserNotLogged />
          )}
        </Route>
        <Route path="/chat" exact>
          {/* {isAuthenticated ? ( */}
          <Chat
            username={
              currentRoom.isAnonymous ? "Anonymous" : user ? user.nickname : ""
            }
            room={currentRoom}
            chats={chats}
          />
          {/* ) : (
            <UserNotLogged />
          )} */}
        </Route>
        <Route path="/favorites-chats" exact>
          {isAuthenticated ? (
            <FavChats
              user={userData}
              chats={chats}
              setCurrentRoom={setCurrentRoom}
              enterChat={enterChat}
              addToFav={addToFav}
            />
          ) : (
            <UserNotLogged />
          )}
        </Route>
        <Route path="/created-chats" exact>
          {isAuthenticated ? (
            <CreatedChats
              user={userData}
              chats={chats}
              setCurrentRoom={setCurrentRoom}
              enterChat={enterChat}
              addToFav={addToFav}
            />
          ) : (
            <UserNotLogged />
          )}
        </Route>
        <Route path="/profile/:username" exact>
          {isAuthenticated ? (
            <Profile profileImg={user.picture} user={userData} setUserData={setUserData} />
          ) : (
            <UserNotLogged />
          )}
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
