import React, { useEffect, useState } from 'react';
import { getData } from '../shared/utils/api.ts';
import HomePage from './HomePage.tsx';
import ErrorPage from './ErrorPage.tsx';

const CheckConnectionPage: React.FC = () => {
  const [status, setStatus] = useState('OK');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setStatus(response.Check_conection);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return <div>{status == 'OK' ? <HomePage /> : <ErrorPage />}</div>;
};

export default CheckConnectionPage;
