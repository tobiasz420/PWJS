import React from 'react';
import './AnswerFeedback.css';

function AnswerFeedback({ feedback }) {
  if (!feedback) {
    return null;
  }

  const isCorrect = feedback.status === 'correct';
  const message = isCorrect ? 'Świetnie! Poprawna odpowiedź.' : 'Niestety, to zła odpowiedź.';
  
  return (
    <div className={`feedback-container ${feedback.status}`}>
      <p className="feedback-message">{message}</p>
      {!isCorrect && (
        <p className="correct-answer-info">
          Poprawna odpowiedź to: <strong>{feedback.correctAnswer}</strong>
        </p>
      )}
    </div>
  );
}

export default AnswerFeedback;