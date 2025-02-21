import { create } from "zustand";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/task";

export interface Task {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  loadTasks: async () => {
    try {
      const data = await fetchTasks();
      set({ tasks: data });
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  },

  addTask: async (title, description) => {
    try {
      await createTask(title, description);
      await useTaskStore.getState().loadTasks(); // Refresh task list
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      await updateTask(taskId, updates);
      await useTaskStore.getState().loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },

  removeTask: async (taskId) => {
    try {
      await deleteTask(taskId);
      await useTaskStore.getState().loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },
}));
