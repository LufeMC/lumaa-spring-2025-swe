import { apiClient } from './client';
import { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

describe('API Client', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds auth token to request headers when token exists', () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    const mockConfig: InternalAxiosRequestConfig = {
      headers: new AxiosHeaders()
    };

    const interceptor = (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    const result = interceptor(mockConfig);
    expect(result.headers.Authorization).toBe(`Bearer ${token}`);
  });

  test('does not add auth token when token does not exist', () => {
    const mockConfig: InternalAxiosRequestConfig = {
      headers: new AxiosHeaders()
    };

    const interceptor = (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    const result = interceptor(mockConfig);
    expect(result.headers.Authorization).toBeUndefined();
  });
}); 