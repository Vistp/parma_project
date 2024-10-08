import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NightModeToggle from './NightModeToggle';
import { useAuth } from 'hooks/useAuth';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleAccount = () => {
    navigate('/account');
  }
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="p" onClick={handleLogoClick} sx={{ flexGrow: 1, cursor: 'pointer' }}>
          Tool Manager
        </Typography>
        <NightModeToggle />
        {isAuthenticated ? (
          <Button onClick={handleAccount} sx={{ color: 'white' }}>
            Личный кабинет
          </Button>
        ) : (
          <Button onClick={handleLogin} sx={{ color: 'white' }}>
            Login
          </Button>
        )}
        
      </Toolbar>
    </AppBar>
  );
};
