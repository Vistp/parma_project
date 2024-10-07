import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { observer } from "mobx-react-lite";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Paper,
  Link,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import authStore from "store/authStore";

type IFormInput = {
  email: string;
  password: string;
};

const useRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleBack = () => {

    navigate("/");
  }
  const navigate = useNavigate();
  

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await authStore.register(data.email, data.password);
    if (!authStore.error) {
      navigate("/login");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleBack,
    onSubmit,
    navigate,
  };
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#000",
    },
  },
};

const Register: React.FC = observer(() => {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleBack,
    onSubmit,
    navigate,
  } = useRegisterForm();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Button onClick={handleBack}>Назад</Button>
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" gutterBottom align="center">
            Регистрация
          </Typography>
          <TextField
            label="Email"
            {...register("email", { required: "Введите email" })}
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
            fullWidth
            margin="normal"
            sx={inputStyles}
          />
          <TextField
            label="Пароль"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Введите пароль" })}
            error={!!errors.password}
            helperText={errors.password ? String(errors.password.message) : ""}
            fullWidth
            margin="normal"
            sx={inputStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: "20px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled={authStore.isLoading}
          >
            {authStore.isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Регистрация"
            )}
          </Button>
          {authStore.error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {authStore.error}
            </Typography>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Уже есть аккаунт?{" "}
            <Link
              onClick={() => navigate("/login")}
              sx={{ textDecoration: "none", cursor: "pointer" }}
            >
              Войти
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
});

export default Register;
