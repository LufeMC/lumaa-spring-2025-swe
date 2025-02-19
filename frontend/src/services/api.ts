/**
 * API service for handling all HTTP requests to the backend
 * This module provides type-safe wrappers around axios for making API calls
 */

import axios from 'axios';
import { Task, LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

// Base URL for API requests, proxied to http://localhost:3000
const API_URL = '/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token'); // Clear invalid token
          window.location.href = '/login'; // Redirect to login
          break;
        case 403:
          // Handle forbidden access
          break;
        case 404:
          // Handle not found
          break;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication related API calls
 */
export const auth = {
  /**
   * Login user with credentials
   * @param credentials - User login credentials
   * @returns Promise with auth response containing JWT token
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  /**
   * Register new user
   * @param credentials - User registration credentials
   * @returns Promise with auth response containing JWT token
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  /**
   * Logout user by removing token
   */
  logout: () => {
    localStorage.removeItem('token');
  },
};

/**
 * Task related API calls
 */
export const tasks = {
  /**
   * Get all tasks for authenticated user
   * @returns Promise with array of tasks
   */
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  /**
   * Create a new task
   * @param task - Task data without id and userId
   * @returns Promise with created task
   */
  create: async (task: Omit<Task, 'id' | 'userId'>): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  /**
   * Update an existing task
   * @param id - Task ID
   * @param task - Partial task data to update
   * @returns Promise with updated task
   */
  update: async (id: number, task: Partial<Task>): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, task);
    return data;
  },

  /**
   * Delete a task
   * @param id - Task ID
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
}; 