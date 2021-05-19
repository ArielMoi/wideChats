import { useState } from "react";
import API from "../../API";
import "./EditWindow.css";

const EditWindow = ({ lastPost, username, updatePosts, setEditMode }) => {
  const [text, setText] = useState(lastPost.text);

  const replacePost = async () => {
    console.log(lastPost);
    await API.patch("/users/posts", {
      username,
      lastPost,
      newPost: {text, time: lastPost.time}
    });

    setEditMode(false);
    updatePosts();
  };

  return (
    <div className="edit-window">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
        cols="80"
      />
      <div>
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button onClick={replacePost}>Submit</button>
      </div>
    </div>
  );
};

export default EditWindow;
