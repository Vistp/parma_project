import axios from 'axios';
import { endpoints } from 'consts/consts';
import tableStore from 'store/tableStore';
import { CustomFile, IFormDrill } from 'types/types';

export const getData = async (endpoint: string = '') => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}?broken=${tableStore.isBroken}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addDrill = async (values: IFormDrill) => {
  const formData = new FormData();
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

  formData.append('drill', JSON.stringify(body));
  formData.append('screws_ids', String([values.screws]));
  formData.append('plates_ids', String([values.plates]));

  if (values.images && values.images.length > 0) {
    values.images.forEach((image) => {
      const customFile = image as CustomFile;
      const originFile = customFile.originFileObj || customFile;
      formData.append('images', originFile);
    });
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${endpoints.createDrill}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Форма успешно отправлена!');
    console.log(response);
    return { message: 'Форма успешно отправлена!' };
  } catch (error) {
    console.error('Возникла ошибка при отправке формы:', error);
    throw error;
  }
};

export const updateDrill = async (id: number | null, values: IFormDrill) => {
  console.log(values.images)
  const formData = new FormData();
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

  formData.append('drill', JSON.stringify(body));
  formData.append('screws_ids', String([values.screws]));
  formData.append('plates_ids', String([values.plates]));

  const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  };

  if (values.images && values.images.length > 0) {
    const existingImageFilesPromises = values.images
      .filter((image) => !(image as CustomFile).originFileObj) 
      .map((image) => {
        const customFile = image as CustomFile;
        const mimeType = 'image/png'; 
        return urlToFile(customFile.url!, customFile.name!, mimeType);
      });

    const newImages = values.images.filter((image) => (image as CustomFile).originFileObj);

    const existingImageFiles = await Promise.all(existingImageFilesPromises);

    existingImageFiles.forEach((file) => {
      formData.append('images', file);
    });

    newImages.forEach((image) => {
      const customFile = image as CustomFile;
      formData.append('images', customFile.originFileObj!);
    });
  }
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}${endpoints.updateDrill}${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Данные успешно обновлены!');
    console.log(response);
    return { message: 'Данные успешно обновлены!' };
  } catch (error) {
    console.error('Возникла ошибка при обновлении данных:', error);
    throw error;
  }
};

export const deleteDrill = async (id: number) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}${endpoints.deleteDrill}${id}`, config);
    tableStore.getDrills();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDrill = async (id: number) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoints.drill}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
