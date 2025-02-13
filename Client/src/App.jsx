import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Assessment from "./Pages/Assessment"; 
import Homepage from "./Pages/Homepage";
import Evaluation from "./Pages/Evaluation";
import Syllabus from "./Pages/Syllabus";
import LoginPage from "./Pages/LoginPage";
import Profilepage from "./Pages/Profilepage";
import About from "./Pages/About";
import Uploadation from "./Pages/Uplodation";


function App() {
  return (
    <Router> {/* Wrap your Routes in Router */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/uplodation" element={<Uploadation />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/auth" element={<LoginPage/>} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/about" element={<About />} />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;

