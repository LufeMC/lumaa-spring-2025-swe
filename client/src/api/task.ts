import { api } from "./axios";

export const fetchTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (title: string, description?: string) => {
  return api.post("/tasks", { title, description });
};

export const updateTask = async (taskId: string, updates: any) => {
  return api.put(`/tasks/${taskId}`, updates);
};

export const deleteTask = async (taskId: string) => {
  return api.delete(`/tasks/${taskId}`);
};
