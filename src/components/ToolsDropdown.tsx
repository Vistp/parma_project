import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ToolsDropdownProps {
  activeTool?: string;
}

export const ToolsDropdown: React.FC<ToolsDropdownProps> = ({ activeTool }) => {
  const [selectedTool, setSelectedTool] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    if (activeTool) {
      setSelectedTool(activeTool);
    } else {
      setSelectedTool('');
    }
  }, [activeTool]);

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
          <MenuItem value="archive" onClick={() => navigate('/archive')}>
            Архив
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
