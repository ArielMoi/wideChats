import { useState, useEffect } from "react";
import API from "../../API";
import Post from "../Post/Post.Component";
import ShowcaseDataUsers from "../ShowcaseDataUsers/ShowcaseDataUsers.Component";
import "./FriendProfile.css";

const FriendProfile = ({ friendName, setFriendProfile }) => {
  const [profileData, setProfileData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentlyShownData, setCurrentlyShownData] = useState("posts");

  useEffect(() => {
    const collectAllUsers = async () => {
      const { data } = await API.get("/users/");
      console.log(data);
      setAllUsers(data);
      setProfileData(data.find((user) => user.name === friendName));
    };

    collectAllUsers();
  }, []);

  return (
    <div>
      <div className="friend-profile">
        {/* <img src={profileImg} alt="profile-img" /> */}
        <h1>{profileData.name}</h1>
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
        <button onClick={() => setFriendProfile("")}>Back To My Profile</button>
      </div>
      <div className="data">
        {allUsers &&
          currentlyShownData === "friends" &&
          allUsers.map(
            (friend) =>
              profileData.friends.includes(friend.name) && (
                <ShowcaseDataUsers name={friend.name} />
              )
          )}
        {allUsers &&
          currentlyShownData === "posts" &&
          profileData.posts &&
          profileData.posts.map((post) => <Post post={post} />)}
      </div>
    </div>
  );
};

export default FriendProfile;
