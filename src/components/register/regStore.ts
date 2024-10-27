import { makeAutoObservable } from "mobx";
import { AuthResponse, IUser } from "./AuthResponse";
import AuthService from "./AuthService";
import axios from "axios";

export default class RegStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUsers(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUsers(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUsers(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response)
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUsers({} as IUser);
    } catch (error) {
      console.log(error);
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_BASE_URL}/refresh`, {withCredentials: true})
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUsers(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }
}