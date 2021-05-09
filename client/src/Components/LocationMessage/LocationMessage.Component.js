const LocationMessage = (coords) => {
    return (
      <div className="msg">
        <p style={{ fontSize: "0.8rem" }}>
          <b className="username">{coords.username} </b> {coords.time}
        </p>
        <a href={coords.coords}>
          <i className="fas fa-thumbtack"></i>
        </a>
      </div>
    );
}

export default LocationMessage;