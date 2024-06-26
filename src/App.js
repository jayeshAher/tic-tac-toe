import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextsquares = squares.slice();
    if (xIsNext) {
      nextsquares[i] = 'X';
    } else {
      nextsquares[i] = 'O';
    }
    onPlay(nextsquares);
  }

  const allSquaresOccupied = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (allSquaresOccupied(squares) && !winner) {
    status = "Draw";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div>
        {[...Array(3)].map((_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {[...Array(3)].map((_, colIndex) => {
              const index = rowIndex * 3 + colIndex;
              if (index < squares.length) {
                return <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextsquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextsquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          You're at move #{currentMove}
        </div>
        <div className="toggles">
          <button className="toggle" onClick={() => jumpTo(currentMove === 0 ? 0 : currentMove - 1)}>
            Prev
          </button>
          <button className="toggle" onClick={() => jumpTo(currentMove === history.length - 1 ? history.length - 1 : currentMove + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}
