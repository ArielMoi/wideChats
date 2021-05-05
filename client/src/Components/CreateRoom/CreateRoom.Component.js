import Button from '../Button/Button.Component'
import {useState} from 'react'

const CreateRoom = (props) => {
    const [formVisibility, setFormVisibility] = useState('hidden');
    const [createdRoomName, setCreatedRoomName] = useState('')
    return (
      <div>
        <Button
          onClick={() => setFormVisibility("visible")}
          text="create room"
        />
        <form style={{ visibility: formVisibility }}>
          <label>choose a room name:</label>
          <input
            type="text"
            required
            onChange={(e) => setCreatedRoomName(e.target.value)}
            value={createdRoomName}
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              setFormVisibility("hidden");
              props.createRoomButton(createdRoomName, props.user);
            }}
            text="create"
          />
        </form>
      </div>
    );
}

export default CreateRoom;