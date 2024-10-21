import { Box, Card, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import tableStore from 'store/tableStore';
import { DrillItem } from 'types/types';
import { getDrill } from 'utils/api';

export const WindowItemDrill: React.FC = observer(() => {
  const [item, setItem] = useState<DrillItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchItemDrill = async () => {
      setLoading(true);
      const drillData = await getDrill(tableStore.idDrillDescription!);
      if (drillData) {
        setItem(drillData);
      }
      setLoading(false);
    };

    if (tableStore.idDrillDescription !== null) {
      fetchItemDrill();
    }
  }, [tableStore.idDrillDescription]);

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
          <Box sx={{ flex: 1, mr: { sm: 2, xs: 0 }, mb: { xs: 2, sm: 0 } }}>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              ID: {item.id}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Название: {item.name}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Диаметр: {item.diameter}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Длина: {item.length_xD}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Глубина сверления: {item.deep_of_drill}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Компания: {item.company}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Описание: {item.description}
            </Typography>
          </Box>
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
                alt='Изображение не найдено'
                style={{
                  height: 'auto',
                  width: '100%',
                  maxWidth: '200px',
                  border: '2px solid rgb(224, 224, 224)',
                  borderRadius: '4px',
                }}
              />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton onClick={handlePrevImage}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNextImage}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
});
