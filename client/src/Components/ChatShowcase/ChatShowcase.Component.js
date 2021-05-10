import Button from '../Button/Button.Component'
import './ChatShowcase.css'

const ChatShowcase = ({chatName, tag, enterFunc, addToFav}) => {
  // can be change to input check box when changed to true will be add to fav abd when value is false will be remove from favs
  return (
    <div className="chat-showcase">
      <h4>{chatName}</h4>
      <h5>{tag}</h5>
      <Button text="add to Favorite" onClick={() => addToFav(chatName)} />
      <Button text="enter" onClick={() => enterFunc(chatName)} />
    </div>
  );
}

export default ChatShowcase;