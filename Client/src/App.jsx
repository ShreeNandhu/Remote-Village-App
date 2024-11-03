import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Assessment from "./Pages/Assessment"; 
import Homepage from "./Pages/Homepage";
import Evaluation from "./Pages/Evaluation";
import Syllabus from "./Pages/Syllabus";
import LoginPage from "./Pages/LoginPage";


function App() {
  return (
    <Router> {/* Wrap your Routes in Router */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/Evaluation" element={<Evaluation />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/auth" element={<LoginPage/>} />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
