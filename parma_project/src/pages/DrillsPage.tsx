import { Container } from '@mui/material';
import { Header } from "../shared/ui/components/Header";
import DrillsTable from "../widgets/ui/components/DrillsTable";
import { ToolsDropdown } from "../widgets/ui/components/ToolsDropdown.tsx";

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