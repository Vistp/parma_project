import axios from "axios";
import { IFormDrill } from "../types/types";
import tableStore from "../../store/tableStore";

export const getData = async (endpoint:string = '') => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}?broken=${tableStore.isBroken}`);
    return res.data
  } catch (error) {
      console.log(error)
  }
}

export const addDrill = async (values: IFormDrill) => {
  const body = {
    name: values.name,
    diameter: values.diameter,
    length_xD: values.length_xD,
    deep_of_drill: values.deep_of_drill,
    plate: values.plate,
    key: values.key,
    company: values.company,
    is_broken: values.is_broken,
    storage: values.storage,
    description: values.description,
  }
  try {
    const response = await axios.post('http://45.9.73.213:8003/api/drill/create', body, {params:body});
    console.log(body)
    console.log("Форма успешно отправлена!");
    console.log(response);
    return { message: 'Форма успешно отправлена!' };
  } catch (error) {
    console.error("Возникла ошибка при отправке формы:", error);
    console.log(error);
    throw error;
  }
}
