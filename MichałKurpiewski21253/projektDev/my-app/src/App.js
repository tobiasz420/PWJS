import React, { useState, useEffect } from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';
import AnswerFeedback from './components/AnswerFeedback';
import './App.css';

function App() {
  const questions = [
    { questionText: 'Ilu zawodników jednej drużyny przebywa na boisku podczas meczu siatkówki?', answerOptions: [ { answerText: '5', isCorrect: false }, { answerText: '6', isCorrect: true }, { answerText: '7', isCorrect: false }, { answerText: '11', isCorrect: false }, ], },
    { questionText: 'Jaką rolę w zespole siatkarskim pełni zawodnik oznaczony jako "libero"?', answerOptions: [ { answerText: 'Tylko atakującą', isCorrect: false }, { answerText: 'Tylko rozgrywającą', isCorrect: false }, { answerText: 'Tylko obronną', isCorrect: true }, { answerText: 'Kapitana drużyny', isCorrect: false }, ], },
    { questionText: 'Ile setów należy wygrać, aby zwyciężyć w meczu siatkówki?', answerOptions: [ { answerText: '2', isCorrect: false }, { answerText: '3', isCorrect: true }, { answerText: '4', isCorrect: false }, { answerText: '5', isCorrect: false }, ], },
    { questionText: 'Na jakiej wysokości zawieszona jest siatka w męskiej siatkówce?', answerOptions: [ { answerText: '2.24 m', isCorrect: false }, { answerText: '2.50 m', isCorrect: false }, { answerText: '2.35 m', isCorrect: false }, { answerText: '2.43 m', isCorrect: true }, ], },
    { questionText: 'Czym jest "tie-break" w siatkówce?', answerOptions: [ { answerText: 'Przerwą na żądanie trenera', isCorrect: false }, { answerText: 'Decydującym, piątym setem', isCorrect: true }, { answerText: 'Błędem ustawienia', isCorrect: false }, { answerText: 'Zagrywką asa', isCorrect: false }, ], },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [animationClass, setAnimationClass] = useState('slide-fade-in');
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isAnswered) return;

    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ status: 'correct' });
    } else {
      const correctAnswer = questions[currentQuestion].answerOptions.find(
        (option) => option.isCorrect
      ).answerText;
      setFeedback({ status: 'incorrect', correctAnswer: correctAnswer });
    }

    const delay = 2000;
    setTimeout(() => {
      setAnimationClass('slide-fade-out');
      
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
        
        setFeedback(null);
        setIsAnswered(false);
        setAnimationClass('slide-fade-in');
      }, 500);
    }, delay);
  };
  
  const handleRestartQuiz = () => {
    setAnimationClass('slide-fade-out');
    setTimeout(() => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
        setFeedback(null);
        setIsAnswered(false);
        setAnimationClass('slide-fade-in');
    }, 500);
  }

  return (
    <div className='app-container'>
      <div className='quiz-wrapper'>
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        
        <div className={`content-container ${animationClass}`}>
          {showScore ? (
            <div className='score-section'>
              Zdobyłeś {score} z {questions.length} punktów!
              <button onClick={handleRestartQuiz}>Spróbuj ponownie</button>
            </div>
          ) : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Pytanie {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
                    disabled={isAnswered} 
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <AnswerFeedback feedback={feedback} />
      </div>
    </div>
  );
}

export default App;