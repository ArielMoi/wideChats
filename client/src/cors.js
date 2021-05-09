let origin;
let socketUri;
if (process.env.NODE_ENV === "development") {
  origin = "http://localhost:3000";
  socketUri = "http://localhost:5000";
}
if (process.env.NODE_ENV === "production") {
  origin = "https://wide-chats.herokuapp.com";
  socketUri = "/";
}

module.exports = { origin, socketUri };

// export default { origin, socketUri };