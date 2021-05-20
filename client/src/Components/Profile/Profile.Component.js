import { useState } from "react";
import API from "../../API";
import FriendsSearch from "../FriendsSearch/FriendsSearch.Component";
import Post from "../Post/Post.Component";
import FriendProfile from "../FriendProfile/FriendProfile.Component";
import date from "date-and-time";
import { v4 as uuid } from "uuid";
import "./Profile.css";
import EditWindow from '../EditWindow/EditWindow.Component'

const Profile = ({ profileImg, user, setUserData }) => {
  const [post, setPost] = useState("");
  const [currentlyShownData, setCurrentlyShownData] = useState("posts");
  const [friendProfile, setFriendProfile] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [postToEdit, setPostToEdit] = useState({});

  const submitPost = async (event) => {
    event.preventDefault();

    const postTemp = post; // so to reset text before request
    setPost(""); // before request to prevent double upload

    await API.patch("/users/", {
      username: user.name,
      post: { text: postTemp, time: date.format(new Date(), "DD/MM HH:mm") },
    });
    
    updateUserData();
  };

  const updateUserData = async () => {
    const { data } = await API.get(`/users/${user.name}`);
    setUserData(data[0]);
  };

  return (
    <div>
      <div
        className="profile"
        style={{ display: friendProfile !== "" ? "none" : "block" }}
      >
        <div className="header">
          <img src={profileImg} alt="profile-img" />
          <h1>{user.name}</h1>
          {currentlyShownData === "friends" && (
            <button onClick={() => setCurrentlyShownData("posts")}>
              show posts
            </button>
          )}
          {currentlyShownData === "posts" && (
            <button onClick={() => setCurrentlyShownData("friends")}>
              show friends
            </button>
          )}
        </div>
        <div className="status-input">
          <form>
            <textarea
              placeholder="how you feeling?"
              onChange={(e) => setPost(e.target.value)}
              value={post}
              rows="4"
              cols="45"
            />
            <button onClick={submitPost} type="submit">
              Post
            </button>
          </form>
        </div>
        <div className="data">
          {currentlyShownData === "friends" && (
            <FriendsSearch
              user={user}
              updateUserData={updateUserData}
              setFriendProfile={setFriendProfile}
            />
          )}
          {currentlyShownData === "posts" &&
            user.posts.map((post) => (
              <Post
                post={post}
                key={uuid()}
                username={user.name}
                updateUserData={updateUserData}
                setEditMode={setEditMode}
                setPostToEdit={setPostToEdit}
              />
            ))}
          {editMode && (
            <EditWindow
              setEditMode={setEditMode}
              updatePosts={updateUserData}
              username={user.name}
              lastPost={postToEdit}
            />
          )}
        </div>
      </div>
      {friendProfile !== "" && (
        <FriendProfile
          friendName={friendProfile}
          setFriendProfile={setFriendProfile}
        />
      )}
    </div>
  );
};

export default Profile;
