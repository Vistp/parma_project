import $api from "./apiRegister";
import { AxiosResponse } from "axios";
import { AuthResponse } from "./AuthResponse";

export default class AuthService {
  // static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
  //   return $api.post<AuthResponse>('auth/jwt/login',{username, password})
  // }

  static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
  
    return $api.post<AuthResponse>(
      'auth/jwt/login',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/register',{email, password})
  }

  static async logout(): Promise<void> {
    return $api.post('auth/jwt/logout')
  }
}