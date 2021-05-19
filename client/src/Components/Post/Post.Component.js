import './Post.css'

const Post = ({post}) => {
    return(<div className='post'>
        <p><b>{post.text}</b></p>
        <p><span>{post.time}</span></p>
    </div>)
}

export default Post;