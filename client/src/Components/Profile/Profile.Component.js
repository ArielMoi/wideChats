import {useState} from 'react';

const Profile = ({ profileImg, user }) => {

  const submitPost = (event) => {
    event.preventDefault();

  }

  return (
    <div>
      <div className="header">
        <img src={profileImg} />
        <h1>{user.name}</h1>
      </div>
      <div className="status-input">
        <form>
            <textarea placeholder='how you feeling?' />
            <button type="submit">Post</button>
        </form>
      </div>
      <div className='posts'>
      </div>
    </div>
  );
};

export default Profile;