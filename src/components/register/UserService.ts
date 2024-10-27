import { AxiosResponse } from "axios";
import { IUser } from "./AuthResponse";
import $api from "./apiRegister";

export default class UserService {
  static(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }
}