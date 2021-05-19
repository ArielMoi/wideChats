import API from "../../API";
import { useEffect, useState } from "react";
import ShowcaseDataUsers from "../ShowcaseDataUsers/ShowcaseDataUsers.Component";
import { v4 as uuid } from "uuid";

const FriendsSearch = ({ user, updateUserData, setFriendProfile }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [showMyFriends, setShowMyFriends] = useState(true);


  useEffect(() => {
    const collectAllUsers = async () => {
      const { data } = await API.get("/users/");
      setAllUsers(data);
    };

    collectAllUsers();
  }, []);

  const addToFriends = async (friendName) => {
    await API.patch("/users/friends/", {
      username: user.name,
      friendName,
    });
    updateUserData();
  };

  const removeFromFriends = async (friendName) => {
    console.log("future func");
    updateUserData();
  };

  return (
    <div class='friend-search'>
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
                  showProfile={() => setFriendProfile(friend.name)}
                  key={uuid()}
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
                  showProfile={() => setFriendProfile(friend.name)}
                  key={uuid()}
                />
              )
          )}
      </div>
    </div>
  );
};

export default FriendsSearch;
