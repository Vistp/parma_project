import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from 'components/Login';
import Register from 'components/RegisterForm';
import HomePage from 'pages/HomePage';
import MainPage from 'pages/MainPage';
import AccountPage from 'pages/AccoutPage';
import ErrorPage from 'pages/ErrorPage';
import NotFoundPage from 'pages/NotFoundPage';
import { useThemeContext } from './ThemeContextProvaider';
import { ThemeProvider, CssBaseline } from '@mui/material';
// import { useContext, useEffect } from 'react';
// import { Context } from 'main';
// import { LoginForm } from 'components/register/LoginForm';


const App = () => {
  const { theme } = useThemeContext();
  // const {regStore} = useContext(Context);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     regStore.checkAuth()
  //   }
  // }, []);

  // if (!regStore.isAuth) {
  //   return <LoginForm/>
  // }

  // return (
  //   <div>
  //     {/* <h1>{regStore.isAuth ? `Пользователь ${regStore.user.email} авторизован` : 'Авторизуйтесь'}</h1> */}
  //     <h1>{regStore.isAuth ? `Пользователь авторизован` : 'Авторизуйтесь'}</h1>
  //     <button onClick={() => regStore.logout()}>Выйти</button>
  //   </div>
  // )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/drills" element={<MainPage />} />
          <Route path="/screws" element={<MainPage />} />
          <Route path="/plates" element={<MainPage />} />
          <Route path="/archive_drills" element={<MainPage />}/>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
