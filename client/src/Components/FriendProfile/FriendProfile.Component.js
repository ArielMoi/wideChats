import { useState, useEffect } from "react";
import API from "../../API";
// import FriendsSearch from "../FriendsSearch/FriendsSearch.Component";
import Post from "../Post/Post.Component";
import ShowcaseDataUsers from "../ShowcaseDataUsers/ShowcaseDataUsers.Component";

const FriendProfile = ({ friendName, setFriendProfile }) => {
  const [profileData, setProfileData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentlyShownData, setCurrentlyShownData] = useState("posts");

  //   useEffect(() => {
  //     const collectUserData = async (friendName) => {
  //       const { data } = await API.get(`/users/${friendName}`);
  //       setProfileData(data);
  //     };
  //     collectUserData();
  //   });

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
      <div className="header">
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
      </div>
      <div className="data">
        {allUsers &&
          currentlyShownData === "friends" &&
          allUsers.map(
            (friend) =>
              profileData.friends.includes(friend.name) &&
            (<ShowcaseDataUsers name={friend.name} />)
          )}
        {allUsers &&
          currentlyShownData === "posts" &&
          profileData.posts && profileData.posts.map((post) => (
            <Post post={post} />
          ))}
      </div>
    </div>
  );
};

export default FriendProfile;
