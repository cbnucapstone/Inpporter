//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import AnalyzeType from './pages/AnalyzeType.js';
import Home from './pages/Home.js';
import Result from './pages/Result';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Question from './pages/Question';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';

// const App =() => <Question/>; //질문지 페이지 렌더링

function App() {
  return (
  <div className="App">
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/analyzetype" element={<AnalyzeType />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/question" element={<Question />} />
      <Route path="/result" element={<Result />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  </div>
  );
}

export default App;
