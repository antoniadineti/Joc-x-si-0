import React, { useState, useEffect } from 'react';
import './App.css';
import winnerSound from './sounds/winner.mp3';


const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playWinnerSound, setPlayWinnerSound] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  useEffect(() => {
    const winnerPlayer = calculateWinner(board);

    if (winnerPlayer) {
      setWinner(winnerPlayer);
      setPlayWinnerSound(true);
    }
  }, [board]);

  useEffect(() => {
    if (playWinnerSound) {
      const audio = new Audio(winnerSound);
      audio.play();
      setPlayWinnerSound(false);
    }
  }, [playWinnerSound]);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button className={`square ${winner && winner === board[index] ? 'winner' : ''}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return (
        <div>
          <p className="status">{`Winner: ${winner}`}</p>
          <button className="restart-button" onClick={handleRestart}>Restart</button>
          
        </div>
      );
    } else {
      return <p className="status">{`Next player: ${isXNext ? 'X' : 'O'}`}</p>;
    }
  };

  return (
    <div className="game">
      {renderStatus()}
      <div className="board">
        {board.map((_, index) => (
          <div key={index} className={`square-container ${winner && winner === board[index] ? 'winner' : ''}`}>
            {renderSquare(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
