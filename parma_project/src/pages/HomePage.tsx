import { useEffect, useState } from "react";
import { Container } from '@mui/material';
import { Footer } from "../shared/ui/components/Footer";
import { Header } from "../shared/ui/components/Header";
// import LoginForm from '../widgets/ui/components/LoginForm';
import { BasicTable } from "../widgets/ui/components/BasicTable.tsx";
import { getData } from "../widgets/api";
import {IDrill} from "../shared/types/types.ts";

const HomePage: React.FC = () => {
    const [data, setData] = useState<IDrill[]>([]);
  
    useEffect(() => {
      getData().then((res) => setData(res))
    }, []);
    
    return (
        <div>
            <Header />
            {/* <LoginForm /> */}
            <Container>
                <BasicTable drills={data} />
            </Container>
            <Footer />
        </div>
    )
}

export default HomePage;