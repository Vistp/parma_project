import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';
import React from "react";
export const Footer: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, position: 'static', bottom: 0, width: '100%' }}>
      <AppBar position="static" color='primary'>
        <Toolbar variant="regular" sx={{ mx: 'auto' }}>
          <CopyrightIcon fontSize='small'/>
          <Typography variant="h6" color="inherit" component="p">
            2024 Tool Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}