import { useEffect, useState } from 'react';
import { getData } from 'utils/api';
import { IDetail } from 'types/types';

const useLoadData = () => {
  const [screws, setScrews] = useState<IDetail[]>([]);
  const [plates, setPlates] = useState<IDetail[]>([]);

  useEffect(() => {
    const fetchScrews = async () => {
      const res = await getData('screws');
      setScrews(res);
    };

    const fetchPlates = async () => {
      const res = await getData('plates');
      setPlates(res);
    };

    fetchScrews();
    fetchPlates();
  }, []);

  return { screws, plates };
};

export default useLoadData;