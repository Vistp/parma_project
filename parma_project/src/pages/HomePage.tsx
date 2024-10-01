import React, { useEffect, useState } from "react";
import { Container } from '@mui/material';
import { Footer } from "../shared/ui/components/Footer";
import { Header } from "../shared/ui/components/Header";
// import LoginForm from '../widgets/ui/components/LoginForm';
import { BasicTable } from "../widgets/ui/components/BasicTable.tsx";
import { getData } from "../shared/utils/api.ts";
import {IDrill} from "../shared/types/types.ts";
import {endpoints} from "../shared/consts/consts.ts";
import { ToolsDropdown } from "../widgets/ui/components/ToolsDropdown.tsx";

const HomePage: React.FC = () => {
    const [data, setData] = useState<IDrill[]>([]);
  
    useEffect(() => {
      getData(endpoints.drills).then((res) => setData(res))
    }, []);
    
    return (
        <div>
            <Header />
            {/* <LoginForm /> */}
            <ToolsDropdown />
            <Container>
                <BasicTable drills={data} />
            </Container>
            <Footer />
        </div>
    )
}

export default HomePage;