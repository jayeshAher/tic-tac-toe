import { useState } from "react";
import Board from "./components/Board";

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

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
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
          <button className="toggle" onClick={handleReset}>Reset</button>
          <button className="toggle" onClick={() => jumpTo(currentMove === history.length - 1 ? history.length - 1 : currentMove + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}
