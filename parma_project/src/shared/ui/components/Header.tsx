import {AppBar, Button, Toolbar, Typography} from '@mui/material'
// import { RegistrationForm } from '../../../widgets/ui/components/RegistrationForm'
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
  }

  return (
    <AppBar position='static' color='primary' >
      <Toolbar>
        <Typography
          variant="h6"
          component="p"
          sx={{ flexGrow: 1 }}
        >
          Tool Manager
        </Typography>
        <Button onClick={handleLogin}
          sx={{ color: 'white' }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}
