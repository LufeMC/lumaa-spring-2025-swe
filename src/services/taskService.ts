import api from '../api/axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    const { data } = await api.put<Task>(`/tasks/${id}`, task);
    return data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
}; 