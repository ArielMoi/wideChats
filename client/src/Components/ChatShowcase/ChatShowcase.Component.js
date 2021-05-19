import Button from "../Button/Button.Component";
import "./ChatShowcase.css";

const ChatShowcase = ({
  chatName,
  tag,
  enterFunc,
  addToFav,
  removeFromFav,
}) => {
  // can be change to input check box when changed to true will be add to fav abd when value is false will be remove from favs
  return (
    <div className="chat-showcase">
      <h4>{chatName}</h4>
      <h5>{tag}</h5>
      {addToFav && (
        <Button text="add to Favorite" onClick={() => addToFav(chatName)} />
      )}
      {removeFromFav && (
        <Button
          text="remove from Fav"
          onClick={() => removeFromFav(chatName)}
        />
      )}
      <Button text="enter" onClick={() => enterFunc(chatName)} />
    </div>
  );
};

export default ChatShowcase;
