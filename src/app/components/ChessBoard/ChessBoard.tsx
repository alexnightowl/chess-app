"use client";

import React, { useEffect, useState } from "react"
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import s from "./ChessBoard.module.css";
import useWindowHeight from "@/src/app/hooks/useWindowHeight"

type Square = string;
type Piece = string;

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const windowHeight: number = useWindowHeight();
  const boardSize: number = windowHeight - 165 - 40;

  useEffect(() => {
    console.log(boardSize)
  }, [boardSize])

  const safeGameMutate = (modify: (game: Chess) => void): void => {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece): boolean => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare
    });

    if (move === null) {
      return false;
    }

    setGame(new Chess(game.fen()));

    return true;
  };

  return (
      <div className={s.boardContainer}>
        <div className={s.boardWrapper} style={{maxWidth: boardSize}}>
          <Chessboard position={game.fen()} onPieceDrop={onDrop} areArrowsAllowed arePremovesAllowed/>
        </div>
        <div className={s.infoPanel}>

        </div>
      </div>
  );
};

export default ChessBoard;
