import './App.css';

import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import AnalyzeType from './pages/AnalyzeType.js';
import Home from './pages/Home.js';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';

import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';

function App() {
  return (
  <div className="App">
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/analyzetype" element={<AnalyzeType />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  </div>
  );
}

export default App;
