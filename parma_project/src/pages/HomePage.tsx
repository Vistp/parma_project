import { useEffect, useState } from "react";
import { Container } from '@mui/material';
import { Footer } from "../shared/ui/components/Footer";
import { Header } from "../shared/ui/components/Header";
import { BasikTable } from "../widgets/ui/components/BasikTable";
import { getData, IDrill } from "../widgets/api";

const HomePage: React.FC = () => {
    const [data, setData] = useState<IDrill[]>([]);
  
    useEffect(() => {
      getData().then((res) => setData(res))
    }, []);
    
    return (
        <div>
            <Header />
                <Container>
                    <BasikTable drills={data} />
                </Container>
            <Footer />
        </div>
    )
}

export default HomePage;