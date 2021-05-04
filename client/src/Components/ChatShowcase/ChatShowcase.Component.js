import Button from '../Button/Button.Component'

const ChatShowcase = (props) => {
    return (
        <div>
            <h4>{props.chatName}</h4>
            <h5>{props.tag}</h5>
            <Button text="enter" />
        </div>)
}

export default ChatShowcase;