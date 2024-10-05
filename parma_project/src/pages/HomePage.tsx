import { Container } from '@mui/material';
import { Header } from "../shared/ui/components/Header";
import { ToolsDropdown } from "../widgets/ui/components/ToolsDropdown.tsx";

const HomePage: React.FC = () => {    
    return (
        <div>
            <Header />
            <Container
                sx={{
                    height: '90vh',
                    backgroundImage: 'url(https://media.istockphoto.com/id/1256339974/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BC%D0%B5%D1%82%D0%B0%D0%BB%D0%BB%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F-%D0%B4%D1%80%D0%B5%D0%BB%D1%8C-%D0%B1%D0%B8%D1%82-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D0%BE%D1%82%D0%B2%D0%B5%D1%80%D1%81%D1%82%D0%B8%D1%8F-%D0%B2-%D0%B1%D0%B5%D1%82%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9-%D1%81%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BF%D1%80%D0%BE%D0%BC%D1%8B%D1%88%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B1%D1%83%D1%80%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BC%D0%B0%D1%88%D0%B8%D0%BD%D1%8B-%D1%81.jpg?s=612x612&w=0&k=20&c=wTt3ZtRzaGl3IUDG6QEngY_osI7_XolXG051uh5W2U4=)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <ToolsDropdown /> 
            </Container>
        </div>
    )
}

export default HomePage;