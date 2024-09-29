import axios from "axios";
import { BASE_URL } from "../shared/consts/consts.ts";

export const getData = async () => {
  try {
    const res = await axios.get(BASE_URL);
      return res.data
  } catch (error) {
      console.log(error)
  }
}