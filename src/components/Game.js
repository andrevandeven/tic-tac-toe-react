import React, { useState } from 'react';
import Board from './Board'
import './Game.css'

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const tie = checkTie(board);
    const winner = calculateWinner(board);

    const handleClick = i => {
        const boardCopy = [...board];
        //do nothing if game is won or user clicks an occupied square
        if (winner || boardCopy[i]) return; 
        //put an x or an o in the clicked square
        boardCopy[i] = xIsNext ? 'X' : 'O';
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    }

    const renderMoves = () => {
        return <button onClick={() => setBoard(Array(9).fill(null))}>
            Start New Game
        </button>
    }

    function calculateWinner(squares) {
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
    }

    function checkTie(squares) {
        let tie = true;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null) {
                tie = false
            }
        }
        return tie;
    }

    return (
        <div className="Game">
            {/* Shrinks the popup when there is no winner */}
            <div className={`winner ${winner !== null || tie ? '' : 'shrink'}`}>
                {/* Display the current winner */}
                <div className='winner-text'>
                    {winner ? winner + ' wins!' : (tie ? "It's a tie" : '')}
                </div>
                {/* Button used to reset the board */}
                {renderMoves()}
            </div>
            <Board squares={board} onClick={handleClick} />
        </div>
    )
}


export default Game;