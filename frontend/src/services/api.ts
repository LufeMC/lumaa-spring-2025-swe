import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Backend base URL
});

export const getRecommendations = async (query: string) => {
  const response = await api.post('/recommend', { query });
  return response.data;
};
