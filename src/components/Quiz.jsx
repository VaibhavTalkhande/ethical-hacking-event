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
    question: "Which of the following is an example of a cryptography algorithm?",
    options: ["RSA", "SHA-256", "AES", "MD5"],
    answer: "RSA"
  },
  {
    question: "What type of attack involves tricking a user into giving away sensitive information?",
    options: ["Phishing Attack", "Brute Force Attack", "Social Engineering Attack", "DNS Spoofing Attack"],
    answer: "Phishing Attack"
  },
  {
    question: "Which protocol is commonly used for securely transferring files over a network?",
    options: ["FTP","SFTP", "SMTP", "HTTP"],
    answer: "SFTP"
  },
  {
    question: "What command is used to list all files and directories in a directory in Linux?",
    options: ["dir", "ls","list", "show"],
    answer: "ls"
  },
  {
    question: "Which command is used to create a new directory in Linux?",
    options: ["newdir", "create", "mkdir","md"],
    answer: "mkdir"
  },
  {
    question: "What does the command 'cd' stand for in Linux?",
    options: ["Current Directory", "Choose Directory","Change Directory", "Copy Directory"],
    answer: "Change Directory"
  },
  {
    question: "Which command is used to display the contents of a file in Linux?",
    options: ["read", "display", "show","cat"],
    answer: "cat"
  },
  {
    question: "What command is used to find occurrences of a keyword in a file?",
    options: ["find", "search", "locate","grep"],
    answer: "grep"
  },
  {
    question: "Which command is used to search for files or directories in Linux?",
    options: ["find", "search", "locate", "seek"],
    answer: "find"
  },
  {
    question: "What does the command 'grep' do in Linux?",
    options: ["Search for a pattern in files", "Display disk usage", "Find and replace text", "Print system information"],
    answer: "Search for a pattern in files"
  },
  {
    question: "Which command is used to display the current date and time in Linux?",
    options: ["time","date", "datetime", "now"],
    answer: "date"
  },
  {
    question: "In Linux, what command is used to navigate to the parent directory?",
    options: ["back", "cd ..", "parentdir", "up"],
    answer: "cd .."
  },
  {
    question: "What command is used to display the last few lines of a file in Linux?",
    options: ["head", "less","tail", "more"],
    answer: "tail"
  },
  {
    question: "Which command is used to terminate a running process in Linux?",
    options: ["stop", "end","kill", "terminate"],
    answer: "kill"
  },
  {
    question: "What does the command 'sudo' do in Linux?",
    options: ["Super user do", "Execute a command as another user", "Start a new terminal session","Switch user to root"],
    answer: "Switch user to root"
  },
    {
      question: "Pick the one that doesn’t fit the group.",
      imageUrl: "https://cdn.quizzes.faceprep.in/VS_7/O_12/images/93146_1678175378.png",
      options: ["A", "B", "C", "D","E","F",],
      answer: "E"
    },
    {
      question: "Guess the company logo",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/288px-Red_Hat_logo.svg.png",
      options: ["RedCap","RedHat","GoldHood","YellowTop"],
      answer: "RedHat"
    },{
      question: "What is the name of the tool in Kali Linux",
      imageUrl: "https://www.softinventive.com/blog/wp-content/uploads/2012/12/nmap-eye.jpg",
      options: ["Aircrack-ng", "Reaver", "Nmap", "Wireshark"],
      answer: "Nmap"
    },
    {
      question: "Pick the one that doesn’t fit the group.",
      imageUrl: "https://cdn.quizzes.faceprep.in/VS_7/O_12/images/79097_1678179962.png",
      options: ["A","B","C","D","E","F","G","H","I"],
      answer: "E"
    },
    {
      question: "What is the name of the tool in Kali Linux",
      imageUrl: "https://miro.medium.com/v2/resize:fit:581/1*jqc9VGIBgq9GkXeJ9jRRvA.png",
      options: ["Hydra","Wireshark","Recon-ng","Maltego"],
      answer: "Hydra"
    },
  
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
if (score >= 12) {
return (
  <div className='result'>
    <h1>Quiz Result</h1>
    <h1>{userName}</h1>
    <h1>Time Taken: {calculateTimeTaken()}</h1> 
    <h1>Your score is {score} out of {questions.length}!</h1>
    <a href="https://forms.gle/Yra4jKKU3veFHtRd6" target="_blank" rel="noopener noreferrer">
      <button>Proceed to Next Round</button>
    </a>
  </div>
);
} else {
return (
  <div className='result'>
    <h1>Quiz Result</h1>
    <h1>{userName}</h1>
    <h1>Time Taken: {calculateTimeTaken()}</h1> 
    <h1>You are disqualified. Your score is {score} out of {questions.length}.</h1>
  </div>
);
}
}

return (
<div className='quiz'>
<h2>Welcome {userName}!</h2>
<div className='time'>Time Left: {formatTime(timer)}</div>
<h3>Question {currentQuestionIndex + 1}</h3>
<div className="question">
  {questions[currentQuestionIndex]?.imageUrl && (
   <img src={questions[currentQuestionIndex]?.imageUrl} style={{ height: '250px' }} alt="Question" />

  )}
  <p>{questions[currentQuestionIndex]?.question}</p>
</div>
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
