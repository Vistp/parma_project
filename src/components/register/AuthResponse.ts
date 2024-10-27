export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  username: string;
  isActivated: boolean;
  id: string;
}