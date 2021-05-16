import API from "../../API";
import { useEffect, useState } from "react";
import ShowcaseDataUsers from "../ShowcaseDataUsers/ShowcaseDataUsers.Component";

const FriendsSearch = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [showMyFriends, setShowMyFriends] = useState(true);

  useEffect(() => {
    const collectAllUsers = async () => {
      const { data } = await API.get("/users/");
      //   console.log(data);
      setAllUsers(data);
    };

    collectAllUsers();

    console.log();
  }, []);

  const addToFriends = async (friendName) => {
    const { data } = await API.patch("/users/friends/", {
      username: user.name,
      friendName,
    });
  };

  const removeFromFriends = async (friendName) => {
    console.log("future func");
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
      {showMyFriends ? (
        <button onClick={() => setShowMyFriends(false)}>All Users</button>
      ) : (
        <button onClick={() => setShowMyFriends(true)}>My Friends</button>
      )}
      <div className="showcase-users">
        {allUsers &&
          !showMyFriends &&
          allUsers.map(
            (friend) =>
              friend.name.includes(currentSearch) && (
                <ShowcaseDataUsers
                  name={friend.name}
                  addFunc={() => addToFriends(friend.name)}
                  btnText="Add"
                />
              )
          )}
        {allUsers &&
          showMyFriends &&
          allUsers.map(
            (friend) =>
              user.friends.includes(friend.name) && (
                <ShowcaseDataUsers
                  name={friend.name}
                  addFunc={() => removeFromFriends(friend.name)}
                  btnText="Remove"
                />
              )
          )}
      </div>
    </div>
  );
};

export default FriendsSearch;
