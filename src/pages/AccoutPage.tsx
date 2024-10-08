import { Container, Typography, Button } from '@mui/material';
import { Header } from 'components/Header';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogaut = () => {
        logout();
        navigate('/');
    };
    return (
        <>
            <Header />
            <Container>
                <Typography variant="h4" gutterBottom>Личный кабинет</Typography>
                <Button
                    variant="contained" 
                    color="primary" 
                    onClick={handleLogaut}    
                >Logaut</Button>
            </Container>
        </>
    )
}

export default AccountPage;