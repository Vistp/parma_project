import axios from 'axios';
import { endpoints } from 'consts/consts';
import tableStore from 'store/tableStore';
import { IFormDrill } from 'types/types';


export const getData = async (endpoint: string = '') => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}?broken=${tableStore.isBroken}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addDrill = async (values: IFormDrill) => {
  const body = {
    name: values.name,
    diameter: Number(values.diameter),
    length_xD: Number(values.length_xD),
    deep_of_drill: Number(values.deep_of_drill),
    key: values.key,
    company: values.company,
    is_broken: values.is_broken,
    storage: values.storage,
    description: values.description,
  };
  console.log(values)
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${endpoints.createDrill}`, {
      drill: JSON.stringify(body),
      screws_ids: String([values.screws]),
      plates_ids: String([values.plates]),
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Форма успешно отправлена!');
    console.log(response);
    return { message: 'Форма успешно отправлена!' };
  } catch (error) {
    console.error('Возникла ошибка при отправке формы:', error);
    console.log(error);
    throw error;
  }
};

export const deleteDrill = async (id: number) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}${endpoints.deleteDrill}${id}`,config);
    tableStore.getDrills();
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
