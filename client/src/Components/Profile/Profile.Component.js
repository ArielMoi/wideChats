import { useState } from "react";
import API from "../../API";
import FriendsSearch from "../FriendsSearch/FriendsSearch.Component";
import Post from "../Post/Post.Component";
import date from "date-and-time";

const Profile = ({ profileImg, user, setUserData }) => {
  const [post, setPost] = useState("");
  const [currentlyShownData, setCurrentlyShownData] = useState("posts");

  const submitPost = async (event) => {
    event.preventDefault();

    await API.patch("/users/", {
      username: user.name,
      post: { text: post, time: date.format(new Date(), "DD/MM HH:mm") },
    });

    setPost("");
    updateUserData();
  };

  const updateUserData = async () => {
    const { data } = await API.get(`/users/${user.name}`);
    setUserData(data[0]);
  };

  return (
    <div>
      <div className="header">
        <img src={profileImg} alt='profile-img'/>
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
          />
          <button onClick={submitPost} type="submit">
            Post
          </button>
        </form>
      </div>
      <div className="data">
        {currentlyShownData === "friends" && (
          <FriendsSearch user={user} updateUserData={updateUserData} />
        )}
        {currentlyShownData === "posts" &&
          user.posts.map((post) => <Post post={post} />)}
      </div>
    </div>
  );
};
//<Post post={post} />
export default Profile;
