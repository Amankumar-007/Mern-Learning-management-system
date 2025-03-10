import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyLearning from "./pages/Student/MyLearning";
import Profile from "./pages/Student/Profile";


const App = () => {
  return <>
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} /> 
      <Route exact path="/mylearning" element={<MyLearning />} /> 
      <Route exact path="/profile" element={<Profile />} /> 
    </Routes>
  </BrowserRouter>

  </>;
};

export default App;
