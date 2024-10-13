import axios from "axios";
import { endpoints } from "consts/consts";

export const getPlates = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoints.plates}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};