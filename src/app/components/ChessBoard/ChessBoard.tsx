"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import s from "./ChessBoard.module.css";

const ChessBoard: React.FC = () => {
  const game = useRef(new Chess());
  const [gamePosition, setGamePosition] = useState<string>(game.current.fen());
  const [stockfishLevel, setStockfishLevel] = useState(2);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const stockfishWorker = new Worker('/stockfish.worker.js');

    stockfishWorker.onmessage = (event) => {
      const message = event.data;
      console.log('Головний потік отримав повідомлення від воркера:', message);

      if (typeof message === 'string' && message.startsWith('bestmove')) {
        const bestMove = message.split(' ')[1];

        game.current.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion:
            bestMove.length > 4 ? bestMove.substring(4) : undefined,
        });

        setGamePosition(game.current.fen());
      }
    };

    setWorker(stockfishWorker);

    return () => {
      stockfishWorker.terminate();
    };
  }, []);

  const levels = {
    "Easy 🤓": 2,
    "Medium 🧐": 8,
    "Hard 😵": 18,
  };

  const findBestMove = () => {
    if (!worker) return;

    const fen = game.current.fen();
    console.log('Відправляємо позицію до воркера:', `position fen ${fen}`);
    worker.postMessage(`position fen ${fen}`);
    console.log('Відправляємо команду go до воркера:', `go depth ${stockfishLevel}`);
    worker.postMessage(`go depth ${stockfishLevel}`);
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setGamePosition(game.current.fen());

    if (game.current.isCheckmate()) {
      alert("Мат!");
      return true;
    }
    if (game.current.isDraw()) {
      alert("Пат!");
      return true;
    }

    findBestMove(); // Хід Stockfish
    return true;
  };

  return (
    <div className={s.boardContainer}>
      <div className={s.levelButtons}>
        {Object.entries(levels).map(([level, depth]) => (
          <button
            key={level}
            className={s.button}
            style={{
              backgroundColor:
                depth === stockfishLevel ? "#B58863" : "#f0d9b5",
            }}
            onClick={() => setStockfishLevel(depth)}
          >
            {level}
          </button>
        ))}
      </div>
      <Chessboard position={gamePosition} onPieceDrop={onDrop} />
      <div className={s.controlButtons}>
        <button
          className={s.button}
          onClick={() => {
            game.current.reset();
            setGamePosition(game.current.fen());
          }}
        >
          Нова гра
        </button>
        <button
          className={s.button}
          onClick={() => {
            game.current.undo();
            setGamePosition(game.current.fen());
          }}
        >
          Скасувати хід
        </button>
      </div>
    </div>
  );
};

export default ChessBoard;
