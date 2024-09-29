import axios from "axios";
import { endpoints } from "../shared/consts/consts";

export const getData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoints.drills}`);
      return res.data
  } catch (error) {
      console.log(error)
  }
}