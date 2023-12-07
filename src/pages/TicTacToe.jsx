import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import circle from "../assets/tictactoe/circle.png";
import cross from "../assets/tictactoe/cross.png";

export const TicTacToe = () => {
  const MySwal = withReactContent(Swal);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerXTurn, setIsPlayerXTurn] = useState(true);

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

    for (const line of lines) {
      const [a, b, c] = line;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
    // if (squares[0] && squares[0] === squares[1] && squares[0] === squares[2]) {
    //   return squares[0];
    // } else if (
    //   squares[3] &&
    //   squares[3] === squares[4] &&
    //   squares[3] === squares[5]
    // ) {
    //   return squares[3];
    // } else if (
    //   squares[6] &&
    //   squares[6] === squares[7] &&
    //   squares[6] === squares[8]
    // ) {
    //   return squares[6];
    // } else if (
    //   squares[0] &&
    //   squares[0] === squares[3] &&
    //   squares[0] === squares[6]
    // ) {
    //   return squares[0];
    // } else if (
    //   squares[1] &&
    //   squares[1] === squares[4] &&
    //   squares[1] === squares[7]
    // ) {
    //   return squares[1];
    // } else if (
    //   squares[2] &&
    //   squares[2] === squares[5] &&
    //   squares[2] === squares[8]
    // ) {
    //   return squares[2];
    // } else if (
    //   squares[0] &&
    //   squares[0] === squares[4] &&
    //   squares[0] === squares[8]
    // ) {
    //   return squares[0];
    // } else if (
    //   squares[2] &&
    //   squares[2] === squares[4] &&
    //   squares[2] === squares[6]
    // ) {
    //   return squares[2];
    // }

    // return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.map((cell, i) =>
      i === index ? (isPlayerXTurn ? "X" : "O") : cell
    );
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      MySwal.fire({
        title: `Congratulations! Team ${winner} wins!`,
        icon: "success",
      });
    } else if (newBoard.every((cell) => cell !== null)) {
      MySwal.fire({
        title: "Draw, try again!",
        icon: "info",
      });
    } else {
      setIsPlayerXTurn(!isPlayerXTurn);
    }
  };

  const renderBox = (index) => (
    <div
      key={index}
      className="bg-slate-500 cursor-pointer w-28 h-28 flex items-center justify-center"
      onClick={() => handleClick(index)}
    >
      {board[index] === "X" && <img src={cross} alt="Cross" className="m-5" />}
      {board[index] === "O" && (
        <img src={circle} alt="Circle" className="m-5" />
      )}
    </div>
  );

  return (
    <div className="bg-slate-800 flex justify-center min-h-screen">
      <div className="container w-2/4 mt-10 my-32 border border-white rounded-2xl">
        <div className="flex items-center m-5 text-white font-bold">
          <div>
            <Link to="/">
              <p className="flex items-center text-2xl">
                <GoArrowLeft className="text-2xl" />
              </p>
            </Link>
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-2xl mr-10">SELAMAT DATANG GAMES TIC TAC TOE</h1>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4 mx-5 my-10">
            {board.map((_, index) => renderBox(index))}
          </div>
        </div>
        <div className="flex justify-center">
          <p
            className="text-center inline-block bg-white px-5 py-2 rounded-xl font-bold text-lg cursor-pointer"
            onClick={() => {
              setBoard(Array(9).fill(null));
              setIsPlayerXTurn(true);
            }}
          >
            RESET
          </p>
        </div>
      </div>
    </div>
  );
};
