const ChatTextInput = (props) => {
    return(<form>
        <input type="text" onChange={props.onChange} value={props.msgValue}/>
        <button type="submit" onClick={props.onClick}>Send</button>
    </form>)
}

export default ChatTextInput;