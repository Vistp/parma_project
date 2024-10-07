import { Container } from '@mui/material';
import DrillsTable from 'components/DrillsTable';
import { Header } from 'components/Header';
import { ToolsDropdown } from 'components/ToolsDropdown';

const DrillsPage: React.FC = () => {
    const activeItem = "drills";

    return (
        <div>
            <Header />
            <Container>
            <ToolsDropdown activeTool={activeItem}/>
                <DrillsTable />
            </Container>
        </div>
    )
}

export default DrillsPage;