import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const register = (username: string, password: string) =>
    api.post('/auth/register', { username, password });

export const login = (username: string, password: string) =>
    api.post('/auth/login', { username, password });

export const getTasks = (token: string) =>
    api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (title: string, description: string, token: string) =>
    api.post('/tasks', { title, description }, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (id: number, title: string, description: string, isComplete: boolean, token: string) =>
    api.put(`/tasks/${id}`, { title, description, isComplete }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (id: number, token: string) =>
    api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });