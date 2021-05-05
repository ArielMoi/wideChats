const ChatMessage = (props) => {
    return (
        <div>
            <p style={{fontSize:"0.8rem"}}><b className='username'>{props.username} </b> {props.time}</p>
            <p>{props.text}</p>
        </div>)
} 

export default ChatMessage;