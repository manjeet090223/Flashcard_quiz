import React, { useState } from "react";
import Lottie from "lottie-react";
import confettiAnim from "../assets/confetti.json";
import trophyAnim from "../assets/win.json";
import "../styles/DragDropGame.css";
import { useNavigate } from "react-router-dom";

const data = [
  { concept: "Photosynthesis", definition: "Plants make food using sunlight" },
  { concept: "Gravity", definition: "Force that pulls objects to Earth" },
  { concept: "Verb", definition: "A word that describes an action" },
  { concept: "Fraction", definition: "A part of a whole" },
];

const DragDropGame = () => {
  const [matched, setMatched] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const playSound = (file) => {
  const audio = new Audio(`/${file}`);
  audio.play();
};


  const handleDragStart = (concept) => {
    setDraggedItem(concept);
  };

  const handleDrop = (definition) => {
  const match = data.find(
    (item) => item.concept === draggedItem && item.definition === definition
  );
  if (match && !matched.includes(draggedItem)) {
    setMatched([...matched, draggedItem]);
    setShowConfetti(true);
    playSound("correct.mp3"); // ✅ Play correct sound
    setTimeout(() => setShowConfetti(false), 1500);
  } else {
    playSound("wrong.mp3"); // ❌ Play wrong sound
  }
  setDraggedItem(null);
  setHovered(null);
};


  const handleRetry = () => {
    setMatched([]);
    setDraggedItem(null);
    setHovered(null);
  };

  return (
    <div className="drag-game-container">
      <h2>Drag & Drop Concepts to Reveal Meanings</h2>

      <div className="drag-columns">
        <div className="drag-column">
          <h3>Concepts</h3>
          {data.map(({ concept }) => (
            <div
              key={concept}
              className={`drag-item ${matched.includes(concept) ? "matched" : ""}`}
              draggable={!matched.includes(concept)}
              onDragStart={() => handleDragStart(concept)}
            >
              {concept}
            </div>
          ))}
        </div>

        <div className="drag-column">
          <h3>Definitions</h3>
          {data.map(({ definition }) => {
            const match = data.find((d) => d.definition === definition);
            const isRevealed = hovered === definition || matched.includes(match?.concept);

            return (
              <div
                key={definition}
                className="drop-zone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setHovered(definition);
                }}
                onDrop={() => handleDrop(definition)}
                onDragLeave={() => setHovered(null)}
              >
                {isRevealed ? (
                  <div className="revealed-text">{definition}</div>
                ) : (
                  <div className="gift-box"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showConfetti && (
        <div className="confetti-overlay">
          <Lottie animationData={confettiAnim} />
        </div>
      )}

      {matched.length === data.length && (
        <div className="final-success">
          <Lottie animationData={trophyAnim} className="trophy-lottie" />
          <p>🏆 You matched everything correctly!</p>
          <div className="button-row">
            <button className="retry-btn" onClick={handleRetry}>
              Retry
            </button>
            <button className="home-btn" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropGame;
