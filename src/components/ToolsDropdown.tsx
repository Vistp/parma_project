import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const ToolsDropdown = () => {
  const [selectedTool, setSelectedTool] = useState<string>('');
  const navigate = useNavigate();

  const activeItem = useLocation().pathname.slice(1)
  
  useEffect(() => {
    if (activeItem) {
      setSelectedTool(activeItem);
    } else {
      setSelectedTool('');
    }
  }, [activeItem]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelectedTool(value);
  };

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ width: '200px', m: '10px' }}>
        <InputLabel id="tools-dropdown-label">Инструменты</InputLabel>
        <Select labelId="tools-dropdown-label" value={selectedTool} onChange={handleChange} label="Инструменты">
          <MenuItem value="drills" onClick={() => navigate('/drills')}>
            Сверла
          </MenuItem>
          <MenuItem value="screws" onClick={() => navigate('/screws')}>
            Винты
          </MenuItem>
          <MenuItem value="plates" onClick={() => navigate('/plates')}>
            Пластины
          </MenuItem>
          <MenuItem value="archive" onClick={() => navigate('/drills_archive')}>
            Архив
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};


