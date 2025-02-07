import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TriviaGame() {
    const [triviaQuestions, setTriviaQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [currentPoints, setCurrentPoints] = useState(0);
    const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [timeLeft, setTimeLeft] = useState(10);
    const [answerFeedback, setAnswerFeedback] = useState(""); 
    const maxQuestions = 10;
    const navigate = useNavigate();


    // Function what combines right and wrong answers and mixes them.
    function combineAllAnswers(incorrectAnswers, correctAnswer) {
        const allAnswers = [...incorrectAnswers, correctAnswer];
        return allAnswers.sort(() => Math.random() - 0.5);
    }

    // Function to fetch questions from API and saves them in TriviaQuestions
    async function fetchTriviaQuestions() {
        setLoading(true);
        try {
            const resp = await axios.get("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple");
            const questions = resp.data.results;
            setTriviaQuestions(questions);  
            setQuestionData(questions[0]);  
        } catch (error) {
            console.error("Searching for the questions failed:", error);
        } finally {
            setLoading(false);
        }
    }
    // Function to set Data for the current question
    function setQuestionData(questionData) {
        setCorrectAnswer(questionData.correct_answer);
        setAllPossibleAnswers(combineAllAnswers(questionData.incorrect_answers, questionData.correct_answer));
    }
    // Searches for questions, when component is downloaded for the first time.
    useEffect(() => {
        fetchTriviaQuestions();
    }, []);
    // Timer
    useEffect(() => {
        if(timeLeft === 0) {
            setTimeout(() => {
                verifyAnswer("");
            }, 1000);
        } else {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    // Function checks, if the chosen answer is right, and updates the points and moves to the next question.
    function verifyAnswer(selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
            setCurrentPoints(currentPoints + 1);
            setFeedback("Correct!");
            setAnswerFeedback("correct");
        } else {
            setFeedback("Incorrect!");
            setAnswerFeedback("incorrect")
        }
        // A little delay, so the user can see the feedback
        setTimeout(() => {
            // If we have reached the maximun number of questions, navigate to results
            if (currentQuestionIndex + 1 >= maxQuestions) {
                navigate('/results', { state: { correctAnswers: currentPoints + (selectedAnswer === correctAnswer ? 1 : 0), totalQuestions: maxQuestions } });
            } else {
                // Else, move to the next question
                const nextIndex = currentQuestionIndex + 1;
                setCurrentQuestionIndex(nextIndex);
                setQuestionData(triviaQuestions[nextIndex]);
                setFeedback("");
                setAnswerFeedback("");
                setTimeLeft(10);
            }
            // 2-second delay
        }, 2000);
    }
    // Function to decode HTML entities in the question and answers
    function decodeHtml(text) {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    return (
        <div className="App">
            <header className="App-header">
                {loading ? (
                    <p>Loading questions...</p>
                ) : (
                    triviaQuestions.length > 0 && (
                        <div>
                            <div>Score: {currentPoints}</div>
                            <div>Question {currentQuestionIndex + 1}/{maxQuestions}</div>
                            <div>Time left: {timeLeft} seconds</div>
                            {feedback && <p>{feedback}</p>}
                            <h2 className="question-text">{decodeHtml(triviaQuestions[currentQuestionIndex].question)}</h2>
                            <div className="answer-buttons">
                                {allPossibleAnswers.map((answer, index) => (
                                    <button
                                        key={index}
                                        className={answerFeedback === "correct" && answer === correctAnswer ? "correct" :
                                            answerFeedback === "incorrect" && answer === correctAnswer ? "correct" :
                                            answerFeedback === "incorrect" && answer !== correctAnswer && answerFeedback ? "incorrect" : ""}
                                        onClick={() => verifyAnswer(answer)}
                                        disabled={!!answerFeedback} 
                                    >
                                        {decodeHtml(answer)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </header>
        </div>
    );
}
    

export default TriviaGame;
