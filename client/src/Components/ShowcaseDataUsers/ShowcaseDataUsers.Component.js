import { useHistory } from "react-router-dom";

const ShowcaseDataUsers = (data) => {
  const history = useHistory();
  return (
    <div>
      <h3>{data.name}</h3>
      {data.addFunc && <button onClick={data.addFunc}>{data.btnText}</button>}
      {data.showProfile && (
        <button onClick={data.showProfile}>Show Profile</button>
      )}
      <button onClick={() => history.push(`/${data.name}/chat`)}>Message</button>
    </div>
  );
};

export default ShowcaseDataUsers;
