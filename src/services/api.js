import axios from "axios";

const api = axios.create({
  baseURL: "https://601a9e250ee87c001706a48a.mockapi.io/",
});

export default api;
