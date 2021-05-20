
const ParticipantsShowcase = ({participants}) => {
    return (
      <div>
        <h3>participants ({participants.length})</h3>
        {participants.map(participant => <p>{participant}</p>)}
      </div>
    );
}

export default ParticipantsShowcase;