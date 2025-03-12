import React, { useState, useEffect } from 'react';
import TotalScore from './TotalScore';
import NumberSelector from './NumberSelector';
import styled from 'styled-components';
import RoleDice from './RoleDice';
import { Button, OutlineButton } from '../styled/Button';
import Rules from './Rules';

const GamePlay = () => {
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [highScore, setHighScore] = useState({ name: "None", score: 0 });


  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(JSON.parse(storedHighScore));
    }
  }, []);


  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rollDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }
    if (!playerName.trim()) {
      setError("Please enter your name before playing.");
      return;
    }
    setError("");
    
    const randomNumber = generateRandomNumber(1, 6);
    setCurrentDice(randomNumber);

    if (selectedNumber === randomNumber) {
      setScore(prev => prev + randomNumber);
    } else {
      setScore(prev => prev - 0.5);
    }

    setSelectedNumber(undefined);
  };


  useEffect(() => {
    if (score > highScore.score) {
      const newHighScore = { name: playerName.trim(), score };
      setHighScore(newHighScore);
      localStorage.setItem("highScore", JSON.stringify(newHighScore));
    }
  }, [score, highScore.score, playerName]);

  const resetScore = () => {
    setScore(0);
    setPlayerName("");
  };

  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector 
          error={error}
          setError={setError}
          selectedNumber={selectedNumber} 
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      
      <div className="high-score">
        <h2>Highest Scorer</h2>
        <p>{highScore.name}: {highScore.score}</p>
      </div>

      <RoleDice currentDice={currentDice} roleDice={rollDice} />

      <div className="player-input">
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={playerName} 
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      
      <div className="btns">
        <OutlineButton onClick={resetScore}>Reset</OutlineButton>
        <Button onClick={() => setShowRules(prev => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div>
      {showRules && <Rules />}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.main`
  padding-top: 20px;
  margin: 0 30px;

  .top_section {
    display: flex;
    justify-content: space-between;
  }
  .btns {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: center; 
  }
  .player-input {
    margin-top: 20px;
    text-align: center;
  }
  .player-input input {
    padding: 10px;
    font-size: 16px;
    width: 200px;
    text-align: center;
  }
  .high-score {
    margin-top: 2px;
    text-align: right;
  }
`;
