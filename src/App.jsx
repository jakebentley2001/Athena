import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PapersPage from './pages/PapersPage';
import SearchPage from './pages/SearchPage';
import PaperDetails from './pages/PaperDetails';
import LearningPage from './pages/LearningPage';


function App() {
    return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/paperdetails" element={<PaperDetails />} />
        <Route path="/learning" element={<LearningPage />} />
    </Routes>
    );
  }
  
  export default App;

// <Route path="/papers/:paperName" element={<PaperDetails />} />