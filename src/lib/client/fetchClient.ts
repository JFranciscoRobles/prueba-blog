import axios from "axios";

const baseURL = `https://${process.env.VERCEL_URL}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
