const ShowcaseDataUsers = (data) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <button onClick={data.sendMessage}>sendMessage</button>
      {data.addFunc && <button onClick={data.addFunc}>{data.btnText}</button>}
      {data.showProfile && (
        <button onClick={data.showProfile}>Show Profile</button>
      )}
    </div>
  );
};

export default ShowcaseDataUsers;
