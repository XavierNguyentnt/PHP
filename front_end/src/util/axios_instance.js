import axios from "axios";
import URL from "./url";

const BASE_URL = URL.BASE_URL;
export default axios.create({
  baseURL: BASE_URL,
});
