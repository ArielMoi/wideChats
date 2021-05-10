import axios from "axios";
let origin;
if (process.env.NODE_ENV === "development") {
    origin = "http://localhost:5000";
}
if (process.env.NODE_ENV === "production") {
    origin = "https://wide-chats.herokuapp.com/";
}
const api = axios.create({
    baseURL: origin,
});

export default api;