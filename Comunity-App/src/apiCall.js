import axios from "axios";

const apiCall = axios.create({
  baseURL: "http://localhost:5000"
});

export default apiCall;