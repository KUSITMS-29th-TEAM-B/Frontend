import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const client = axios.create({
  baseURL: API_KEY,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "include",
    withCredentials: true,
  },
});

export default client;
