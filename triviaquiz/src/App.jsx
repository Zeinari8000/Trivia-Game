import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Welcome';
import TriviaGame from './TriviaGame';
import Results from './results';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trivia" element={<TriviaGame />} />
                <Route path="/results" element={<Results />} /> 
            </Routes>
        </Router>
    );
}

export default App;
