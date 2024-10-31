import axios from 'axios';
import { endpoints } from 'consts/consts';
import tableStore from 'store/tableStore';
import { CustomFile, DetailType, IFormDrill, IPlate, IScrew } from 'types/types';

const getData = async (endpoint: string = '') => {
  try {
    const isBroken = endpoint === 'drills' ? `?broken=${tableStore.isBroken}` : '';
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}${isBroken}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async (id: number, detail: DetailType) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoints[detail]}/${id}`);
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
  console.log(values.images);
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

const deleteDetail = async (id: number, detail: DetailType) => {
  const endpoint =
    detail === 'drills'
      ? endpoints.deleteDrill
      : detail === 'screws'
      ? endpoints.deleteScrew
      : detail === 'plates'
      ? endpoints.deletePlate
      : undefined;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}${endpoint}${id}`, config);
    tableStore.getDetails(detail);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addScrew = async (values: IScrew): Promise<IScrew> => {
  const formData = new FormData();
  const body = {
    type: values.type,
    length: Number(values.length),
    thread: values.thread,
    step_of_thread: Number(values.step_of_thread),
    company: values.company,
    description: values.description,
  };

  formData.append('screw', JSON.stringify(body));

  if (values.images && values.images.length > 0) {
    values.images.forEach((image) => {
      const customFile = image as CustomFile;
      const originFile = customFile.originFileObj || customFile;
      formData.append('images', originFile);
    });
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${endpoints.createScrew}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Форма успешно отправлена для винта!');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Возникла ошибка при отправке формы для винта:', error);
    throw error;
  }
};

export const addPlate = async (values: IPlate): Promise<IPlate> => {
  const formData = new FormData();
  const body = {
    type: values.type,
    sub_type: values.sub_type,
    material: values.material,
    amount: Number(values.amount),
    min_amount: Number(values.min_amount),
    company: values.company,
    description: values.description,
  };

  formData.append('plate', JSON.stringify(body));

  if (values.images && values.images.length > 0) {
    values.images.forEach((image) => {
      const customFile = image as CustomFile;
      const originFile = customFile.originFileObj || customFile;
      formData.append('images', originFile);
    });
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${endpoints.createPlate}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Форма успешно отправлена для пластины!');
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error('Возникла ошибка при отправке формы для пластины:', error);
    throw error;
  }
};

export { getData, getDetail, deleteDetail };

export const updatePlate = async (id: number | null, values: IPlate) => {
  const formData = new FormData();
  const body = {
    type: values.type,
    sub_type: values.sub_type,
    material: values.material,
    amount: Number(values.amount),
    min_amount: Number(values.min_amount),
    company: values.company,
    description: values.description,
  };

  formData.append('plate', JSON.stringify(body));

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
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}${endpoints.updatePlate}${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log(response);
    console.log('Пластина успешно обновлена!');
    return { message: 'Пластина успешно обновлена!' };
  } catch (error) {
    console.error('Ошибка при обновлении пластины:', error);
    throw error;
  }
};

export const updateScrew = async (id: number | null, values: IScrew) => {
  const formData = new FormData();
  const body = {
    type: values.type,
    length: Number(values.length),
    thread: values.thread,
    step_of_thread: Number(values.step_of_thread),
    company: values.company,
    description: values.description,
  };

  formData.append('screw', JSON.stringify(body));

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
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}${endpoints.updateScrew}${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log(response);
    console.log('Винт успешно обновлен!');
    return { message: 'Винт успешно обновлен!' };
  } catch (error) {
    console.error('Ошибка при обновлении винта:', error);
    throw error;
  }
};

