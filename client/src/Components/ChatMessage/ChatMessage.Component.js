const ChatMessage = (props) => {
    return (
        <div>
            <p><span className='username'>{props.username}</span></p>
            <p>{props.text}</p>
        </div>)
} 

export default ChatMessage;