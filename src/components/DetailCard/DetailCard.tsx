import { Box, Card, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import tableStore from 'store/tableStore';
import { DetailType, IDetail } from 'types/types';
import { getDetail } from 'utils/api';
import { DrillCardTmp, PlatesCardTmp, ScrewCardTmp } from './CardTmp';
import { useLocation } from 'react-router-dom';

export const DetailCard = observer(() => {
  const [item, setItem] = useState<IDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  const activeItems: string = useLocation().pathname.slice(1);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);

      // console.log(tableStore.idDetailDescription!, activeItems.slice(0, -1))
      const detail = await getDetail(tableStore.idDetailDescription!, activeItems.slice(0, -1) as DetailType);
      if (detail) {
        setItem(detail);
      }

      setLoading(false);
    };

    if (tableStore.idDetailDescription !== null) {
      fetchDetail();
    }
  }, [tableStore.idDetailDescription]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (item === null) {
    return <div>Выберите строку</div>;
  }

  const images = item.image_path ? item.image_path.split(',').map((img) => img.trim()) : [];

  const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <Card sx={{ minWidth: 275, padding: 2, mt: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
          {activeItems === 'drills' ? (
            <DrillCardTmp item={item} />
          ) : activeItems === 'screws' ? (
            <ScrewCardTmp item={item} />
          ) : activeItems === 'plates' ? (
            <PlatesCardTmp item={item} />
          ) : activeItems === 'archive_drills' ? (
            <DrillCardTmp item={item} />
          ) : (
            <div>Неверный тип данных</div>
          )}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                mb: 1,
              }}
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}${images[imageIndex]}`}
                alt="Изображение не найдено"
                style={{
                  height: 'auto',
                  width: '100%',
                  maxWidth: '200px',
                  border: '2px solid rgb(224, 224, 224)',
                  borderRadius: '4px',
                }}
              />
            </Box>
            <Box sx={{ fontSize: '14px', color: 'gray' }}>{`${imageIndex + 1}/${images.length}`}</Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton onClick={handlePrevImage} disabled={imageIndex === 0}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNextImage} disabled={imageIndex === images.length - 1}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
});
