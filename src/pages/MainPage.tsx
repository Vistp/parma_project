import { Container } from '@mui/material';
import { Header } from 'components/Header';
import { ToolsDropdown } from 'components/ToolsDropdown';
import InitialTable from '../components/Tables/InitialTable'
import { DetailCard } from 'components/DetailCard/DetailCard';


const MainPage = () => {
    return (
        <div>
            <Header />
            <ToolsDropdown/>
            <Container>
                <InitialTable/>
                <DetailCard/>
            </Container>
        </div>
    )
}

export default MainPage;
