import { api } from "./axios";

export const loginUser = async (username: string, password: string) => {
  const { data } = await api.post("/auth/login", { username, password });
  return data.token;
};

export const registerUser = async (username: string, password: string) => {
  return api.post("/auth/register", { username, password });
};
