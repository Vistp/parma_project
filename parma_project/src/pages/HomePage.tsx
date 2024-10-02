import { Container } from '@mui/material';
import { Header } from "../shared/ui/components/Header";
import { BasicTable } from "../widgets/ui/components/BasicTable.tsx";
import { ToolsDropdown } from "../widgets/ui/components/ToolsDropdown.tsx";

const HomePage: React.FC = () => {    
    return (
        <div>
            <Header />
            <ToolsDropdown />
            <Container>
                <BasicTable />
            </Container>
        </div>
    )
}

export default HomePage;