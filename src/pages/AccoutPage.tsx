import { Container, Typography, Button, Card, CardHeader, Avatar, CardActions } from '@mui/material';
import { Header } from 'components/Header';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { email, logout } = useAuth();
  const handleLogaut = () => {
    logout();
    navigate('/');
  };
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 4 }}>
          Личный кабинет
        </Typography>
        <Card sx={{ maxWidth: 345, m: 2 }}>
          <CardHeader avatar={<Avatar alt="Ted talk" />} title={`User name: ${email}`} subheader={'Role'} />
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleLogaut}>
              Logaut
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default AccountPage;
