import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9090/api",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
  },
});

export default instance;
