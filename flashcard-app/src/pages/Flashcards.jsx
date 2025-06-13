import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import bulbAnimation from '../assets/bulb.json';
import bookAnimation from '../assets/book.json';
import '../styles/Flashcard.css';

const Flashcards = ({ subject }) => {
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/full_concepts.json')
      .then(res => res.json())
      .then(data => {
        const formattedSubject = subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();
        if (data[formattedSubject]) {
          setCards(data[formattedSubject]);
        } else {
          navigate('/learn');
        }
      });
  }, [subject]);

  if (cards.length === 0) return <div className="loading">Loading flashcards...</div>;

  const currentCard = cards[current];

  return (
    <div className='flashcard-page'>
    <div className="flashcards-container">
      <h2>{subject.toUpperCase()} Flashcards</h2>

      
      <div className="top-right-animation">
        <Lottie animationData={bulbAnimation} loop={true} style={{ width: 180, height: 180 }} />
      </div>
      <div className="bottom-left-animation">
        <Lottie animationData={bookAnimation} loop={true} style={{ width: 250, height: 250 }} />
      </div>

      <div className="card-navigation">
        <span
          className="arrow left-arrow"
          onClick={() => {
            setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
            setFlipped(false);
          }}
        >
          ⬅️
        </span>

        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          {!flipped ? (
            <div className="front">
              <h3>{currentCard.concept}</h3>
            </div>
          ) : (
            <div className="back">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    flipped
                      ? `${currentCard.videoUrl}${
                          currentCard.videoUrl.includes('?') ? '&' : '?'
                        }autoplay=1&mute=1`
                      : ''
                  }
                  title="Concept Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <span
          className="arrow right-arrow"
          onClick={() => {
            setCurrent((prev) => (prev + 1) % cards.length);
            setFlipped(false);
          }}
        >
          ➡️
        </span>
      </div>
    </div>
    </div>
  );
};

export default Flashcards;
