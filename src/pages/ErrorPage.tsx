import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <Container sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Ведутся технические работы
        </Typography>
        <Typography variant="body1" gutterBottom>
          Мы скоро вернемся. Попробуйте обновить страницу позже.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          На главную
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;