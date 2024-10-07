import React from 'react';
import {Container, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const NotFoundPage:React.FC = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    }
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Страница не найдена
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleGoHome}
            >
                На главную
            </Button>
    </Container>
    );
};

export default NotFoundPage;