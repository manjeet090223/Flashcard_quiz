import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import typingAnimation from '../assets/typing.json';
import correctAnimation from '../assets/correct.json';
import wrongAnimation from '../assets/wrong.json';
import botAvatar from '../assets/bot-avatar.json';
import popSound from '../assets/pop.mp3';
import '../styles/ChatQuiz.css';
import { useNavigate } from 'react-router-dom';

const ChatQuiz = ({ subject, concept }) => {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  
  const chatRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    fetch('/quiz_questions.json')
      .then(res => res.json())
      .then(data => {
        const conceptData = data.find(
          (item) => item.subject === subject && item.concept === concept
        );
        if (conceptData) {
          setQuestions(conceptData.questions);
          showNextQuestion(conceptData.questions, 0); 
        } else {
          setMessages([{ type: 'bot', text: 'No questions found for this concept 😕' }]);
        }
      });
  }, [subject, concept]);

  
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showTyping]);

  const showNextQuestion = (questionsList = questions, index = currentQuestionIndex) => {
    if (index < questionsList.length) {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        const q = questionsList[index];
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: q.question,
            options: q.options,
            questionIndex: index, 
          },
        ]);
      }, 1000);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleOptionClick = (option) => {
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = option === currentQ.answer;

    audioRef.current?.play();

   
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text: option,
        isCorrect,
        questionIndex: currentQuestionIndex, 
      },
    ]);

    
    if (isCorrect) setScore((prev) => prev + 1);
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

   
    setTimeout(() => {
      showNextQuestion(questions, nextIndex);
    }, 1000);
  };

  const handleRetry = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    showNextQuestion(questions, 0); 
  };

  const handleShowResults = () => {
    navigate('/result', { state: { score, total: questions.length } });
  };

  return (
    <div className="chat-container">
      <div className="chat-area" ref={chatRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-row ${msg.type}`}>
            {msg.type === 'bot' &&
              !quizCompleted &&
              index === messages.length - 1 &&
              msg.options && (
                <div className="bot-avatar-bubble">
                  <Lottie animationData={botAvatar} className="avatar-icon" loop />
                </div>
              )}

            <div className={`chat-bubble ${msg.type}`}>
              {msg.text}
              {msg.options && !quizCompleted && (
                <div className="options">
                  {msg.options.map((opt, i) => (
                    <button key={i} onClick={() => handleOptionClick(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {msg.type === 'user' && typeof msg.isCorrect !== 'undefined' && (
                <span className="answer-animation">
                  <Lottie
                    animationData={msg.isCorrect ? correctAnimation : wrongAnimation}
                    style={{ height: 40 }}
                  />
                </span>
              )}
            </div>
          </div>
        ))}

        {showTyping && (
          <div className="chat-row bot">
            <div className="bot-avatar-bubble">
              <Lottie animationData={botAvatar} className="avatar-icon" loop />
            </div>
            <div className="chat-bubble bot">
              <Lottie animationData={typingAnimation} style={{ height: 40 }} />
            </div>
          </div>
        )}
      </div>

      {quizCompleted && (
        <div className="result-buttons">
          <button onClick={handleRetry}>🔄 Retry</button>
          <button onClick={handleShowResults}>🏆 Show Results</button>
        </div>
      )}

      <audio ref={audioRef} src={popSound} />
    </div>
  );
};

export default ChatQuiz;
