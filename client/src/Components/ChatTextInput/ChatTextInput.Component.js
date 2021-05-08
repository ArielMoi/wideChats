import "./ChatTextInput.css";

const ChatTextInput = (props) => {
    return (
      <form className="ChatTextInput">
        <input type="text" onChange={props.onChange} value={props.msgValue} />
        <button type="submit" onClick={props.onClick}>
          Send
        </button>
        <button onClick={props.shareLocation}>
          <i className="fas fa-thumbtack"></i>
        </button>
      </form>
    );
}

export default ChatTextInput;