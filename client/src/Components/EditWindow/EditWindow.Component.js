import { useState, useEffect } from "react";
import APi from "../../API";
import { useHistory } from "react-router-dom";

const EditWindow = ({ lastPost, username, updatePosts }) => {
  const [text, setText] = useState(lastPost);
  const history = useHistory()

  const replacePost = async () => {
    await API.patch("/users/posts", {
      username,
      lastPost,
      newPost: text,
    });

    history.push(`/profile/${username}`);
    updatePosts();
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => history.push(`/profile/${username}`)}>Cancel</button>
      <button onClick={replacePost}>Submit</button>
    </div>
  );
};

export default EditWindow;