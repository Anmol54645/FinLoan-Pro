import axios from "axios";

const API = axios.create({
  baseURL: "https://finloan-pro-backend.onrender.com/api",
});

export default API;