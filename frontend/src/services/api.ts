import axios from "axios";

const API_URL = "http://localhost:3001"; // Backend URL

export const register = (username: string, password: string) =>
  axios.post(`${API_URL}/auth/register`, { username, password });

export const login = (username: string, password: string) =>
  axios.post(`${API_URL}/auth/login`, { username, password });

export const getTasks = (token: string) =>
  axios.get(`${API_URL}/tasks`, { headers: { Authorization: token } });

export const createTask = (token: string, title: string, description: string) =>
  axios.post(`${API_URL}/tasks`, { title, description }, { headers: { Authorization: token } });

export const updateTask = (token: string, id: string, data: object) =>
  axios.put(`${API_URL}/tasks/${id}`, data, { headers: { Authorization: token } });

export const deleteTask = (token: string, id: string) =>
  axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: token } });
