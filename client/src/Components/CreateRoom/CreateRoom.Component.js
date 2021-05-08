import Button from "../Button/Button.Component";
import { useState } from "react";
import './CreateRoom.css'
import { useHistory } from "react-router-dom";

const CreateRoom = (props) => {
  const [createdRoomName, setCreatedRoomName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [chatType, setChatType] = useState('')
  const history = useHistory();
  return (
    <div className="create-room" style={{ display: props.display }}>
      <form>
        <br />
        <label>room name:</label>
        <br />
        <input
          type="text"
          required
          onChange={(e) => setCreatedRoomName(e.target.value)}
          value={createdRoomName}
        />
        <hr />
        <label>Anonymous? </label>
        <input
          type="checkbox"
          onChange={() => setIsAnonymous(!isAnonymous)}
          value={isAnonymous}
        />
        <hr />
        <label>type: </label>
        <br />
        <input
          type="text"
          required
          onChange={(e) => setChatType(e.target.value)}
          value={chatType}
        />
        <hr />
        <Button
          onClick={(event) => {
            event.preventDefault();
            props.createRoomButton(
              createdRoomName,
              props.user,
              isAnonymous,
              chatType && chatType
            );
            history.push("/");
          }}
          text="create"
        />
      </form>
    </div>
  );
};

export default CreateRoom;
