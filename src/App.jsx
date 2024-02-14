import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Rules from './components/Rules';
import Quiz from './components/Quiz';
import './App.css';
function App() {
  const [userName, setUserName] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  return (
    <div className="App">
      {!userName && !showRules && (
        <Welcome onNameSubmit={setUserName} onNext={() => setShowRules(true)} />
      )}
      {!startQuiz && showRules && (
        <Rules onStartQuiz={handleStartQuiz} />
      )}
      {startQuiz && <Quiz userName={userName} />}
    </div>
  );
}

export default App;
