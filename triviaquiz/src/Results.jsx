import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const { correctAnswers, totalQuestions } = location.state || { correctAnswers: 0, totalQuestions: 10 };
    // Restarts the game
    const restartGame = () => {
        navigate('/'); 
    };
    // Feedback message based on the score
    const feedbackMessage = correctAnswers === totalQuestions
        ? "Excellent! You are the master"
        : correctAnswers >= 8
        ? "Great job! Your knowledge about sports is amazing!"
        : correctAnswers >= 5
        ? "Good effort! A little practise and you will become master at this"
        : correctAnswers >= 3
        ? "Nice try! Maybe try again and it will go little bit better"
        : correctAnswers >= 0
        ? "Maybe sports trivia ain´t your strenght?"
        : "Just keep practising!"
        

    return (
        <div className="App">
            <header className="App-header">
                <h2>Thank you for playing!</h2>
                <p>The score you achieved: {correctAnswers} / {totalQuestions}</p>
                <h3>{feedbackMessage}</h3>
                <button onClick={restartGame}>Restart The Game</button>
            </header>
        </div>
    );
}

export default Results;
