let origin;
if (process.env.NODE_ENV === "development") {
  origin = "http://localhost:3000";
}
if (process.env.NODE_ENV === "production") {
  origin = "https://wide-chats.herokuapp.com";
}

export default origin;