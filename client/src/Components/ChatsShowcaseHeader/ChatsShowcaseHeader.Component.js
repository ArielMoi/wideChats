const ChatsShowcaseHeader = ({ searchByType, setSearchByType,setSearchChats, chats }) => {
  const search = (input) => {
    const a = searchByType
      ? chats.filter((chat) => chat.type.startsWith(input))
      : chats.filter((chat) => chat.name.startsWith(input));
    input !== "" ? setSearchChats(a) : setSearchChats([]);
  };

  return (
    <div className="headers">
      <input type="text" onChange={(event) => search(event.target.value)} />
      <i className="fas fa-search"></i>
      <input
        type="checkbox"
        onChange={() => setSearchByType(!searchByType)}
        value={searchByType}
      />
      <label> by type</label>
    </div>
  );
};

export default ChatsShowcaseHeader;
