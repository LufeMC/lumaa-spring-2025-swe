import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

const getToken = () => localStorage.getItem("lumaa_token_2");

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Token expired or invalid");

      localStorage.removeItem("lumaa_token_2");
    }
    return Promise.reject(error);
  }
);

export const register = async (username: string, password: string) => {
  const response = await api.post("/auth/register", { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  const { access_token } = response.data;
  localStorage.setItem("lumaa_token_2", access_token);
  return access_token;
};

export const logout = () => {
  localStorage.removeItem("lumaa_token_2");
};

export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: {
  title: string;
  description?: string;
  isComplete?: boolean;
}) => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  task: { title?: string; description?: string; isComplete?: boolean }
) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
