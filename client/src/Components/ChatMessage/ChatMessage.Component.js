import './ChatMessage.css'

const ChatMessage = (props) => {
    return (
        <div className='msg'>
            <p style={{fontSize:"0.8rem"}}><b className='username'>{props.username} </b> {props.time}</p>
            <p className='text'>{props.text}</p>
        </div>)
} 

export default ChatMessage;