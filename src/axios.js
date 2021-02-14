import axios from "axios";
const instance = axios.create({
  baseURL:"http://65.0.5.14:8000",
  timeout: 60000,
});
export default instance;