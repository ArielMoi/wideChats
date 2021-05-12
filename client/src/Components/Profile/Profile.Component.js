const Profile = ({ profileImg, username, posts }) => {
  return (
    <div>
      <div className="header">
        <img src={profileImg} />
        <h1>{username}</h1>
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