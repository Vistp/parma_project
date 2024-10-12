import { Container } from '@mui/material';
import DrillsTable from 'components/DrillsTable';
import { Header } from 'components/Header';
import { ToolsDropdown } from 'components/ToolsDropdown';
import { WindowItemDrill } from 'components/WindowItemDrill';

const DrillsPage: React.FC = () => {
    const activeItem = "drills";

    return (
        <div>
            <Header />
            <ToolsDropdown activeTool={activeItem} />
            <Container>
                <DrillsTable />
                <WindowItemDrill />
            </Container>
        </div>
    )
}

export default DrillsPage;