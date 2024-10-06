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

  // Создаем FormData и добавляем объект 'drill' в виде строки
  const formData = new FormData();
  formData.append('drill', JSON.stringify(body));// Объект 'drill' как строка
  console.log(formData);
//   formData.append('screws_ids', screws_ids.join(',')); // Передача массива 'screws_ids'
//     formData.append('image_1', image1File);  // Передача файла
//     formData.append('image_2', image2File);  // Передача файла
//     formData.append('image_3', image3File);  // Передача файла

    try {
    // Отправляем POST запрос с FormData
    const response = await axios.post('http://45.9.73.213:8003/api/drill/create', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });

    console.log("Форма успешно отправлена!");
    console.log(response);
    return { message: 'Форма успешно отправлена!' };
  } catch (error) {
    console.error("Возникла ошибка при отправке формы:", error);
    console.log(error);
    throw error;
  }
};
