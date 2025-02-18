import { http, HttpResponse } from 'msw'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const handlers = [
  http.post(`${API_URL}/auth/login`, () => {
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username: 'testuser'
      }
    })
  }),

  http.get(`${API_URL}/tasks`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: 'TODO'
      }
    ])
  })
]; 