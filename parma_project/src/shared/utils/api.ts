import axios from "axios";

export const getData = async (endpoint:string = '') => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}` + endpoint);
      return res.data
  } catch (error) {
    console.log(error)
  }
}