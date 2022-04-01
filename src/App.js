//import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar.js';
import AnalyzeType from './AnalyzeType.js';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';

function App() {
  return (
  <>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/analyzetype" element={<AnalyzeType />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
