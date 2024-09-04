import axios from "axios";
import process from "process";

const http = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080/api",
});

http.interceptors.request.use((config) => {
	config.headers = {
		"Content-Type": "application/json",
	};
	return config;
});

export default http;
