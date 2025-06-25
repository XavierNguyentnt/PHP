import axios from "axios";

const BASE_URL = "http://localhost:8888/api";
export default axios.create({
  baseURL: BASE_URL,
});
