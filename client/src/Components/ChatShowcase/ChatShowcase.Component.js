import Button from '../Button/Button.Component'


const ChatShowcase = ({chatName, tag, enterFunc}) => {
    return (
      <div>
        <h4>{chatName}</h4>
        <h5>{tag}</h5>
        <Button text="enter" onClick={() => enterFunc(chatName)} />
      </div>
    );
}

export default ChatShowcase;