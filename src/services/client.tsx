import axios from "axios";

const client = axios.create({
  baseURL: "https://isprogrammingfun.site",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "include",
    withCredentials: true,
  },
});

export default client;
