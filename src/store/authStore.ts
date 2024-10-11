import { endpoints } from 'consts/consts';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class AuthStore {
  isLoading = false;
  error = '';
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async register(email: string, password: string) {
    this.setLoading(true);
    this.setError('');
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}${endpoints.register}`, { email, password });
      this.isAuthenticated = true;
    } catch (error: any) {
      this.setError(error.response?.data?.detail || 'Произошла ошибка регистрации');
    } finally {
      this.setLoading(false);
    }
  }

  async login(username: string, password: string) {
    this.setLoading(true);
    this.setError('');
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}${endpoints.login}`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      this.isAuthenticated = true;
    } catch (error: any) {
      this.setError(error.response?.data?.detail || 'Произошла ошибка входа');
    } finally {
      this.setLoading(false);
    }
  }
  
  logout() {
    this.isAuthenticated = false;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setError(message: string) {
    this.error = message;
  }
}

export default new AuthStore();
