import { Container } from '@mui/material';
import { Header } from 'components/Header';
import { ToolsDropdown } from 'components/ToolsDropdown';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <ToolsDropdown />
      </Container>
    </>
  );
};

export default HomePage;