import axios from "axios";

export interface IDrill {
  name: string;
  deep_of_drill: number;
  screws: string;
  company: string;
  image_path: null,
  create_at: string;
  id: number;
  plate: string;
  diameter: number;
  length: number;
  key: string;
  is_broken: boolean,
  storage: null,
  update_at: string;
}

const BASE_URL = 'http://45.9.73.213:8003/api/drills';

export const getData = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (error) {
    console.log(error)
  }
}