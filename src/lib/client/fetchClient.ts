import axios from "axios";

const baseURL = `https://${process.env.URL}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
