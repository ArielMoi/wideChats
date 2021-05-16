import {useState} from 'react';
import API from '../../API'
import { Link } from "react-router-dom";
import FriendsSearch from '../FriendsSearch/FriendsSearch.Component'


const Profile = ({ profileImg, user }) => {
  const [post, setPost] = useState('')
  const [currentlyShownData, setCurrentlyShownData] = useState(user.posts)

  const submitPost = async (event) => {
    event.preventDefault();

    await API.patch('/users/', {
      username: user.name,
      post,
    })

    setPost('');
  }

  // TODO:
  // posts/friends component (DOUBLE)
  // friends search and add function -> AddFriend Component !!

  return (
    <div>
      <div className="header">
        <img src={profileImg} />
        <h1>{user.name}</h1>
        <button>Add A Friend</button>
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
      <div className="posts">
        <FriendsSearch user={user}/>
      </div>
    </div>
  );
};

export default Profile;