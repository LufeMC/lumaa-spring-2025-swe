/**
 * User interface representing a user in the system
 */
export interface User {
  /** Unique identifier for the user */
  id: number;
  /** Username (3-50 characters) */
  username: string;
}

/**
 * Task interface representing a task in the system
 */
export interface Task {
  /** Unique identifier for the task */
  id: number;
  /** Task title (1-100 characters) */
  title: string;
  /** Optional task description (0-500 characters) */
  description?: string;
  /** Whether the task is completed */
  isComplete: boolean;
  /** ID of the user who owns this task */
  userId: number;
}

/**
 * Authentication response containing JWT token
 */
export interface AuthResponse {
  /** JWT token for authentication */
  token: string;
}

/**
 * Login credentials for user authentication
 */
export interface LoginCredentials {
  /** Username (3-50 characters) */
  username: string;
  /** Password (6-50 characters) */
  password: string;
}

/**
 * Registration credentials extending login credentials
 * Currently identical to LoginCredentials but may include
 * additional fields in the future
 */
export interface RegisterCredentials extends LoginCredentials {} 