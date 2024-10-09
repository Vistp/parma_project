import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class AuthStore {
  isLoading = false;
  error = '';
  token = '';
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async register(email: string, password: string) {
    this.setLoading(true);
    this.setError('');
    try {
      const response = await axios.post('https://gas159.ru/api/auth/register', { email, password });
      this.setToken(response.data.token);
      this.isAuthenticated = true;
    } catch (error: any) {
      this.setError(error.response?.data?.message || 'Произошла ошибка регистрации');
    } finally {
      this.setLoading(false);
    }
  }

  async login(username: string, password: string) {
    this.setLoading(true);
    this.setError('');
    try {
      const response = await axios.post(
        'https://gas159.ru/api/auth/jwt/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      this.setToken(response.data.token);
      this.isAuthenticated = true;
    } catch (error: any) {
      this.setError(error.response?.data?.message || 'Произошла ошибка входа');
    } finally {
      this.setLoading(false);
    }
  }

  loginWithToken(token: string) {
    this.setToken(token);
    this.isAuthenticated = true;
  }

  logout() {
    this.setToken('');
    this.isAuthenticated = false;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setError(message: string) {
    this.error = message;
  }

  setToken(token: string) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }
}

export default new AuthStore();
