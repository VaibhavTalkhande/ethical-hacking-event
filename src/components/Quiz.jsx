import React, { useState, useEffect } from 'react';
import './Quiz.css';
const Quiz = ({ userName }) => {
  const [questions, setQuestions] = useState([]); // Array of quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(''));
  const [timer, setTimer] = useState(900); // 5 minutes in seconds
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Load questions from an API or a local file on component mount
  useEffect(() => {
    // Fetch questions and setQuestions state
    // For now, let's assume questions are already set
    const dummyQuestions = [
      {
        question: "Which of the following is an example of a network security vulnerability?",
        options: ["SSL/TLS", "ARP Spoofing", "MAC Address Filtering", "DNSSEC"],
        answer: "ARP Spoofing"
      },
      {
        question: "What type of attack involves flooding a network with useless traffic?",
        options: ["DDoS Attack", "SQL Injection", "Cross-Site Scripting", "Man-in-the-Middle Attack"],
        answer: "DDoS Attack"
      },
      {
        question: "Which tool is commonly used for scanning and mapping networks?",
        options: ["Wireshark", "Nmap", "Metasploit", "John the Ripper"],
        answer: "Nmap"
      },
      {
        question: "What command is used to display the manual of a command in Linux?",
        options: ["man", "help", "info", "doc"],
        answer: "man"
      },
      {
        question: "Which command is used to change permissions of a file in Linux?",
        options: ["chmod", "chperm", "chown", "perm"],
        answer: "chmod"
      },
      {
        question: "What does the command 'pwd' stand for in Linux?",
        options: ["Print Working Directory", "Present Working Directory", "Print Directory", "Path Working Directory"],
        answer: "Print Working Directory"
      },
      {
        question: "Which command is used to copy files or directories in Linux?",
        options: ["cp", "mv", "copy", "duplicate"],
        answer: "cp"
      },
      {
        question: "What command is used to remove a directory in Linux?",
        options: ["rmdir", "rm", "remove", "delete"],
        answer: "rm"
      },
      {
        question: "Which command is used to search for files or directories in Linux?",
        options: ["find", "search", "locate", "seek"],
        answer: "find"
      },
      {
        question: "What does the command 'grep' do in Linux?",
        options: ["Display disk usage", "Find and replace text", "Search for a pattern in files", "Print system information"],
        answer: "Search for a pattern in files"
      },
      {
        question: "Which command is used to display the current date and time in Linux?",
        options: ["date", "time", "datetime", "now"],
        answer: "date"
      },
      {
        question: "In Linux, what command is used to navigate to the parent directory?",
        options: ["cd ..", "back", "parentdir", "up"],
        answer: "cd .."
      },
      {
        question: "What command is used to display the last few lines of a file in Linux?",
        options: ["tail", "head", "less", "more"],
        answer: "tail"
      },
      {
        question: "Which command is used to terminate a running process in Linux?",
        options: ["kill", "stop", "end", "terminate"],
        answer: "kill"
      },
      {
        question: "What does the command 'sudo' do in Linux?",
        options: ["Switch user to root", "Super user do", "Execute a command as another user", "Start a new terminal session"],
        answer: "Switch user to root"
      }
          
    ];
    setQuestions(dummyQuestions);
    setSelectedAnswers(Array(dummyQuestions.length).fill(''));
  }, []);

   // Handle next question button click
   const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      setShowResult(true);
    }
  };

  // Handle previous question button click
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle selecting an answer
  const handleAnswerSelect = (answer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedSelectedAnswers);
    // Check if the selected answer is correct
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (!showResult) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
        if (timer === 0) {
          clearInterval(interval);
          setShowResult(true);
        }
      }, 1000);
  
      // Save start time when timer starts
      if (startTime === null) {
        setStartTime(new Date());
      }
    } else {
      clearInterval(interval); // Clear interval if result is shown
    }
  
    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [timer, showResult]);

  // Calculate time taken in minutes and seconds
  const calculateTimeTaken = () => {
    const endTime = new Date();
    const timeDifference = endTime.getTime() - startTime.getTime(); // Time difference in milliseconds
    const timeTakenInSeconds = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
    const minutes = Math.floor(timeTakenInSeconds / 60);
    const seconds = timeTakenInSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  // Format timer to minutes:seconds
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  if (showResult) {
    return (
      <div className='result'>
        <h1>Quiz Result</h1>
        <h1>{userName}</h1>
        <h1>Time Taken: {calculateTimeTaken()}</h1> 
        <h1>your score is {score} out of {questions.length}!</h1>
      </div>
    );
  }

  return (
    <div className='quiz'>
      <h2>Welcome {userName}!</h2>
        <div className='time'>Time Left: {formatTime(timer)}</div>
      <h3>Question {currentQuestionIndex + 1}</h3>
      <p>{questions[currentQuestionIndex]?.question}</p>
      <ul>
        {questions[currentQuestionIndex]?.options.map((option, index) => (
          <li key={index}>
            <div 
              className={`option ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </div>
          </li>
        ))}
      </ul>
      <div>
        {currentQuestionIndex > 0 && <button onClick={handlePreviousQuestion}>Previous Question</button>}
      <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    </div>
  );
};

export default Quiz;