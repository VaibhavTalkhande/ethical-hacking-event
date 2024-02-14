import React from 'react';
import './Rules.css';
const Rules = ({ onStartQuiz }) => {
  return (
    <div className='Rules'>
      <h1>Quiz Rules</h1>
      <p> 
        <ul>
          <li>There are 10 questions in this quiz.</li>
          <li>Each question has 4 options.</li>
          <li>Each question has a timer of 15 seconds.</li>
          <li>Once you select an option, it cannot be changed.</li>
          <li>Once you start the quiz, you cannot pause it.</li>
          <li>Once you start the quiz, you cannot retake it.</li>
          <li>Once the quiz is complete, you will see your result.</li>
        </ul>

      </p>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default Rules;
