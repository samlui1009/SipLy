import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/Register.jsx';
import LoginPage from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<RegisterPage />}></Route>
                <Route path="/login-to-siply" element={<LoginPage />}></Route>
                <Route path="/siply-home" element={<HomePage />}></Route>
            </Routes>
        </Router>
    </>
  )
}

export default App
