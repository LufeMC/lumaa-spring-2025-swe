export interface IUser {
  id: number;
  username: string;
  password: string;
  tasks?: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
  user?: IUser;
} 