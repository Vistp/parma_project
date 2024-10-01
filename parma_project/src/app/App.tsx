import { Routes, Route } from 'react-router-dom'
import CheckConnectionPage from "../pages/CheckConnectionPage.tsx";
import LoginForm from '../widgets/ui/components/LoginForm.tsx';
// import { RegistrationForm } from '../widgets/ui/components/RegistrationForm.tsx';


function App() {

  return (
    <Routes>
      <Route path="/" element={<CheckConnectionPage/>}/>
      <Route path="/registration" element={<LoginForm/>}/>
    </Routes>
  )
}

export default App
