const Post = ({post}) => {
    return(<div>
        <p><b>{post.text}</b></p>
        <p>{post.time}</p>
    </div>)
}

export default Post;