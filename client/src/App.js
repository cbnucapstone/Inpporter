import "./App.css";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

// import AnalyzeType from "./pages/AnalyzeType.js";
import Home from "./pages/Home.js";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Question from "./pages/Question";
import ClassComponent from "./pages/Result";
import Dictaphone from "./pages/VoiceRecord";
import SelectQuestion from "./pages/SelectQuestion";
import ResultList from "./pages/ResultList";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        {/* <div className="background" style={{backgroundImage: 'url(./bgimg2.png)',  backgroundSize: 'cover', width: '100%', height:'auto', backgroundRepeat: 'repeat-y', }}> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/Inpporter/" element={<Home />} /> */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/question" element={<Question />} />
          <Route path="/result" element={<ClassComponent />} />
          <Route path="/voicerecord" element={<Dictaphone />} />
          <Route
            path="/selectquestion"
            element={<SelectQuestion />}
          />
          <Route path="/resultList" element={<ResultList />} />
        </Routes>
        {/* </div> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
