import Button from "../Button/Button.Component";
import { useState } from "react";
import './CreateRoom.css'

const CreateRoom = (props) => {
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [createdRoomName, setCreatedRoomName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [chatType, setChatType] = useState('')
  return (
    <div className="create-room" style={{ display: props.display }}>
      <div className="btn-create-room">
        <Button
          onClick={() => setFormVisibility("visible")}
          text="create room"
        />
      </div>
      <br />
      <form style={{ visibility: formVisibility }}>
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
            setFormVisibility("hidden");
            props.createRoomButton(
              createdRoomName,
              props.user,
              isAnonymous,
              chatType && chatType
            );
          }}
          text="create"
        />
      </form>
    </div>
  );
};

export default CreateRoom;
