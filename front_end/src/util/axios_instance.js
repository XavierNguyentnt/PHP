import axios from "axios";

const BASE_URL = "http://localhost/api";
export default axios.create({
  baseURL: BASE_URL,
});
