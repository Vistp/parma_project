import { Container } from '@mui/material';
import DrillsTable from 'components/DrillsTable';
import { Header } from 'components/Header';
import { ToolsDropdown } from 'components/ToolsDropdown';

const DrillsPage: React.FC = () => {
    const activeItem = "drills";

    return (
        <div>
            <Header />
            <ToolsDropdown activeTool={activeItem} />
            <Container>
                <DrillsTable />
            </Container>
        </div>
    )
}

export default DrillsPage;