import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IDrill } from '../../../shared/types/types';
import { useState } from 'react';

interface IFilterDrills {
  drills: IDrill[];
}

export const FilterDiameter: React.FC<IFilterDrills> = ({ drills }) => {
  const [diameter, setDiameter] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDiameter(event.target.value);
  };

  const uniqueDiameters = Array.from(new Set(drills.map(drill => drill.diameter)));

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Диаметр</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={diameter == null ? "" : String(diameter)}
        label="Диаметр"
        onChange={handleChange}
      >
        {uniqueDiameters.map(diameter => (
          <MenuItem key={diameter} value={diameter}>{diameter}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}