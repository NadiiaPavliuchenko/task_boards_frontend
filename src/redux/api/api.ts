import axios from "axios";

const api = axios.create({
  baseURL: "https://task-boards-backend.onrender.com/api"
});

export default api;
