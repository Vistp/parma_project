import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react";
import tableStore from "store/tableStore"

// TODO: вынести запрос, интерфейс

interface DrillItem {
  id: number;
  name: string;
  diameter: number;
  length_xD: number;
  deep_of_drill: number;
  company: string;
  description: string;
  image_path: string;
}

export const WindowItemDrill: React.FC = observer(() => {
  const [item, setItem] = useState<DrillItem | null>(null);
  const [loading, setLoading] = useState(true);

  const getItemDrill = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}drill/${tableStore.idDrillDescription}`);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemDrill();
  }, [tableStore.idDrillDescription]);

  if (item === null) {
    return <div>Выберите строку</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h1>{tableStore.idDrillDescription}</h1> */}
      <Card sx={{ minWidth: 275, padding: 2, mt: 4 }}>
        <Box display="flex">
          <Box sx={{ flex: 1, mr: 2 }}>
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
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
              Изображение:
            </Typography>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${item.image_path}`}
              style={{
                height: '150px',
                width: 'auto',
                border: '2px solid rgb(224, 224, 224)',
                borderRadius: '4px',
              }} />
          </Box>
        </Box>
      </Card>
    </div>
  )
})
