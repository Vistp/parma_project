import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export const ToolsDropdown: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedTool(event.target.value as string);
    }
    return (
        <>
            <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb:2 }}>
                <InputLabel id="tools-dropdown-label">Инструменты</InputLabel>
                <Select
                    labelId="tools-dropdown-label"
                    value={selectedTool}
                    onChange={handleChange}
                    label="Инструменты"
                >
                    <MenuItem value="drills">Сверла</MenuItem>
                    <MenuItem value="screws">Винты</MenuItem>
                    <MenuItem value="archive">Архив</MenuItem>
                </Select>
            </FormControl>

        </>
    )
}