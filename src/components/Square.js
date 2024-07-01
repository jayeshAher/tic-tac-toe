export default function Square({ value, onSquareClick, isWinning }) {
    return (
        <button className={isWinning ? "highlighted-square" : "square"} onClick={onSquareClick}>
            {value}
        </button>
    );
}