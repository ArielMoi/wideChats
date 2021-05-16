import API from "../../API";
import { useEffect, useState } from "react";
import ShowcaseDataUsers from "../ShowcaseDataUsers/ShowcaseDataUsers.Component";

const FriendsSearch = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    const collectAllUsers = async () => {
      const { data } = await API.get("/users/");
      console.log(data);
      setAllUsers(data);
    };

    collectAllUsers();
  }, []);

  const addToFriends = async (friendName) => {
    const { data } = await API.patch("/users/friends/", {
      username: user.name,
      friendName,
    });
    console.log(data);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          required
          placeholder="friend name to search"
          onChange={(e) => setCurrentSearch(e.target.value)}
          value={currentSearch}
        />
      </form>
      <div className="showcase-users">
        {allUsers &&
          allUsers.map(
            (user) =>
              user.name.includes(currentSearch) && (
                <ShowcaseDataUsers name={user.name} addFunc={() => addToFriends(user.name)}/>
              )
          )}
      </div>
    </div>
  );
};

export default FriendsSearch;
