import Button from "../Button/Button.Component";
import { useState } from "react";

const CreateRoom = (props) => {
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [createdRoomName, setCreatedRoomName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  return (
    <div>
      <Button onClick={() => setFormVisibility("visible")} text="create room" />
      <form style={{ visibility: formVisibility }}>
        <label>choose a room name:</label>
        <input
          type="text"
          required
          onChange={(e) => setCreatedRoomName(e.target.value)}
          value={createdRoomName}
        />
        <label>Anonymous ?</label>
        <input
          type="checkbox"
          onChange={() => setIsAnonymous(!isAnonymous)}
          value={isAnonymous}
        />
        <Button
          onClick={(event) => {
            event.preventDefault();
            setFormVisibility("hidden");
            props.createRoomButton(createdRoomName, props.user, isAnonymous);
          }}
          text="create"
        />
      </form>
    </div>
  );
};

export default CreateRoom;
