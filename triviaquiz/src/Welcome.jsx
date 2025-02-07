import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <h1>Welcome to play sports trivia!</h1>
      <p>Test your knowledge with fun questions about sports.</p>
      <div className='game-rules'>
        <h3>Game Rules</h3>
        <ul>
          <li>Answer 10 questions in total.</li>
          <li>In each question you have 10 seconds to choose the correct answer.</li>
          <li>For every correct answer, you will earn 1 point.</li>
          <li>Your goal is to score as many points as possible.</li>
          <li>Ready to go? Press the button below to start the quiz!</li>
        </ul>
      </div>
      <Link to="/trivia">
        <button>Play Sports Trivia!</button>
      </Link>
    </div>
  );
}

export default Welcome;
