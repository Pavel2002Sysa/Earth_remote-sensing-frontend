import axios from "axios";
export const djangoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});
