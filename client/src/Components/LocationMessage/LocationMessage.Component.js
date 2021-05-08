const LocationMessage = (coords) => {
    return (
      <div>
        <a
          href={`http://google.com/maps/?q=${coords.latitude},${coords.longitude}`}
        >
          <i className="fas fa-thumbtack"></i>
        </a>
      </div>
    );
}

export default LocationMessage;