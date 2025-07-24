import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MiniGames.css";

const MiniGames = () => {
  const navigate = useNavigate();

  return (
    <div className="mini-games-container">
      <h2 className="mini-games-title">Mini Games</h2>
      <p className="mini-games-subtitle">Pick a game and start learning playfully!</p>

      <div className="game-options">
        <div className="game-card" onClick={() => navigate("/mini-games/match")}>
          🧩 Match the Concept
        </div>
        <div className="game-card" onClick={() => navigate("/mini-games/drag-drop")}>
          🔤 Drag & Drop Game
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
