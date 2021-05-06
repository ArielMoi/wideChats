import ChatShowcase from '../ChatShowcase/ChatShowcase.Component'
import { v4 as uuid } from "uuid";

const AllChats = ({chats, enterChat}) => {
    // add search and מיון

    return(      
    <div className="chats-showcase">
        <h1>Chats</h1>
        {chats.map((chat) => (
          <ChatShowcase
            key={uuid()}
            chatName={chat.name}
            enterFunc={() => enterChat(chat)}
            tag={chat.type}
          /> // create a func to open chat to the correct room when "enter"
        ))}
      </div>)
}

export default AllChats;