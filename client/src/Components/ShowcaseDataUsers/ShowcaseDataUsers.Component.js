const ShowcaseDataUsers = (data) => {
    return(<div>
        <h3>{data.name}</h3>
        <button onClick={data.addFunc}>Add</button>
        <button onClick={data.sendMessage}>sendMessage</button>
    </div>)
}

export default ShowcaseDataUsers;