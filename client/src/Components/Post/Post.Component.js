import "./Post.css";
import API from "../../API";

const Post = ({
  post,
  username,
  updateUserData,
  setEditMode,
  setPostToEdit,
}) => {
  const deletePost = async () => {
    await API.delete("/users/posts/", {
      data: {
        username,
        post,
      },
    });

    updateUserData();
  };

  const startEdit = () => {
    setEditMode(true) 
    setPostToEdit(post)
  }

  return (
    <div className="post">
      <p>
        <b>{post.text}</b>
      </p>
      <p>
        <span>{post.time}</span>
      </p>
      <button onClick={deletePost}>X</button>
      <button className="edit" onClick={startEdit}>
        <i className="far fa-edit"></i>
      </button>
    </div>
  );
};

export default Post;
