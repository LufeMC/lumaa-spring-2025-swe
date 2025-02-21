export interface Task {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
  }
  
  export interface User {
    id: number;
    username: string;
  }