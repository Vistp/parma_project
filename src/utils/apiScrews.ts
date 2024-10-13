import axios from "axios";
import { endpoints } from "consts/consts";

export const getScrews = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoints.screws}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};