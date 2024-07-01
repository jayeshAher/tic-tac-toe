import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
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
  
    function allSquaresOccupied(squares) {
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
      status = "Winner: " + winner[0];
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
          return [squares[a], [a, b, c]];
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
                  return <Square 
                    key={index} 
                    value={squares[index]} 
                    onSquareClick={() => handleClick(index)} 
                    isWinning={winner ? ((index === winner[1][0] || index === winner[1][1] || index === winner[1][2]) ? true : false) : false} 
                    />
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </>
    );
  }