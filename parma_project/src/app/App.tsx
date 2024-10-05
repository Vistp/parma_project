import {Routes, Route, useNavigate} from 'react-router-dom'
import LoginForm from '../widgets/ui/components/LoginForm.tsx';
import HomePage from "../pages/HomePage.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import {useEffect} from "react";
import { checkConnectionFunction } from "../shared/utils/checkConnectionFunction.ts";
import DrillsPage from '../pages/DrillsPage.tsx';


function App() {
    const navigate = useNavigate();
    useEffect(() => {
        checkConnectionFunction().then((result) => result == 'OK' ? navigate('/') : navigate('/error'))
    },[])

  return (
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<LoginForm />}/>
        <Route path="/drills" element={<DrillsPage />}/>
        <Route path="/error" element={<ErrorPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
