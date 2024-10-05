import { Container } from '@mui/material';
import { Header } from "../shared/ui/components/Header";
import { BasicTable } from "../widgets/ui/components/BasicTable.tsx";
import { ToolsDropdown } from "../widgets/ui/components/ToolsDropdown.tsx";

const DrillsPage: React.FC = () => {
    const activeItem = "drills";

    return (
        <div>
            <Header />
            <Container>
            <ToolsDropdown activeTool={activeItem}/>
                <BasicTable />
            </Container>
        </div>
    )
}

export default DrillsPage;