import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sparkle from "../assets/confetti.json";
import celebrate from "../assets/win.json";
import "../styles/MatchGame.css";

const allData = [
  { concept: "Photosynthesis", definition: "Plants make food using sunlight" },
  { concept: "Gravity", definition: "Force that pulls objects to Earth" },
  { concept: "Verb", definition: "A word that describes an action" },
  { concept: "Fraction", definition: "A part of a whole" },
  { concept: "Noun", definition: "A person, place, or thing" },
  { concept: "Condensation", definition: "Gas turning into liquid" },
  { concept: "Adjective", definition: "A word that describes a noun" },
];

const getRandomPairs = () => {
  return [...allData].sort(() => Math.random() - 0.5).slice(0, 4);
};

const MatchGame = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(getRandomPairs());
  const [concepts, setConcepts] = useState(() => [...data].sort(() => Math.random() - 0.5));
  const [defs, setDefs] = useState(() => [...data].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showSparkle, setShowSparkle] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const playSound = (file) => new Audio(`/${file}`).play();

  const handleConceptClick = (concept) => {
    setSelected(concept);
  };

  const handleDefClick = (definition) => {
    if (selected) {
      const correct = data.find(
        (item) => item.concept === selected && item.definition === definition
      );
      if (correct && !matches.includes(selected)) {
        setMatches([...matches, selected]);
        playSound("correct.mp3");
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 1000);
      } else {
        playSound("wrong.mp3");
      }
      setSelected(null);

      if (matches.length + 1 === data.length) {
        setTimeout(() => setGameOver(true), 1200);
      }
    }
  };

  const handleRetry = () => {
    const newData = getRandomPairs();
    setData(newData);
    setConcepts([...newData].sort(() => Math.random() - 0.5));
    setDefs([...newData].sort(() => Math.random() - 0.5));
    setMatches([]);
    setSelected(null);
    setShowSparkle(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="match-game-container">
        <div className="confetti-wrapper">
          <Lottie animationData={sparkle} />
        </div>
        <div className="match-success">
        <Lottie
  animationData={celebrate}
  className="trophy-lottie"
  style={{ width: "600px", height: "600px" }}  
/>

          <p>🏆 Brilliant! You've matched everything!</p>
          <div className="button-row">
            <button className="back-home-btn" onClick={() => navigate("/")}>
              Back to Home
            </button>
            <button className="retry-btn" onClick={handleRetry}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="match-game-container">
      <h2>🧠 Match the Concepts to Their Meaning!</h2>
      <div className="match-columns">
        <div className="column">
          <h3>🟣 Concepts</h3>
          {concepts.map(({ concept }) => (
            <button
              key={concept}
              className={`concept-btn ${
                matches.includes(concept) ? "matched" : selected === concept ? "selected" : ""
              }`}
              onClick={() => handleConceptClick(concept)}
              disabled={matches.includes(concept)}
            >
              {concept}
            </button>
          ))}
        </div>
        <div className="column">
          <h3>🔵 Definitions</h3>
          {defs.map(({ definition }) => (
            <button key={definition} className="def-btn" onClick={() => handleDefClick(definition)}>
              {definition}
            </button>
          ))}
        </div>
      </div>

      {showSparkle && (
        <div className="confetti-wrapper">
          <Lottie animationData={sparkle} />
        </div>
      )}
    </div>
  );
};

export default MatchGame;
