import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    
    // TODO: добавить логику авторизации
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5,
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          mb: 2,
        }}
      >
        <Typography component="h1" variant="h6" gutterBottom>
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Логин"
            {...register('username', { required: "Логин является обязательным" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: "Email является обязательным",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            {...register('password', {
              required: "Пароль является обязательным",
              minLength: {
                value: 6,
                message: "Пароль должен содержать не менее 6 символов",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;