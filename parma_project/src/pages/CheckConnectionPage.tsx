import React, {useEffect, useState} from 'react';
import {getData} from "../shared/utils/api.ts";
import HomePage from "./HomePage.tsx";
import ErrorPage from "./ErrorPage.tsx";

const CheckConnectionPage:React.FC = () => {
    const [status, setStatus] = useState('');
    useEffect(() => {
        getData().then((res) => setStatus(res.Check_conection))
    }, []);
    return (
        <div>
            {status == 'OK' ? <HomePage /> : <ErrorPage />}
        </div>
    );
};

export default CheckConnectionPage;