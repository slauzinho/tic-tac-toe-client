import useGameStocket from '@/hooks/useGameStocket';
import { useMemo } from 'react';

export function Board() {
  const { game, myMark, makeMove } = useGameStocket();

  const winningCoordinates = useMemo(() => {
    if (!game?.board) return null;
    const board = game.board;
    const size = board.length;

    for (let i = 0; i < size; i++) {
      // Check row
      if (
        board[i]![0] &&
        board[i]![0] === board[i]![1] &&
        board[i]![1] === board[i]![2]
      ) {
        return [
          [i, 0],
          [i, 1],
          [i, 2],
        ];
      }

      // Check column
      if (
        board[0]![i] &&
        board[0]![i] === board[1]![i] &&
        board[1]![i] === board[2]![i]
      ) {
        return [
          [0, i],
          [1, i],
          [2, i],
        ];
      }
    }

    // Check diagonals
    if (
      board[0]![0] &&
      board[0]![0] === board[1]![1] &&
      board[1]![1] === board[2]![2]
    ) {
      return [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }
    if (
      board[0]![2] &&
      board[0]![2] === board[1]![1] &&
      board[1]![1] === board[2]![0]
    ) {
      return [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    // No winner found
    return null;
  }, [game?.board]);

  if (!game?.board) return null;

  return (
    <div className="flex">
      {game.board.map((row, i) => (
        <div key={i} className="flex-col">
          {row.map((_, j) => (
            <button
              key={j}
              disabled={game.current?.mark !== myMark}
              className={`flex items-center justify-center w-16 h-16 text-2xl font-bold border border-gray-300 ${
                winningCoordinates?.some(([x, y]) => x === i && y === j)
                  ? 'bg-green-500'
                  : ''
              }`}
              onClick={() => makeMove({ row: i, col: j })}
            >
              {game.board![i]![j]}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
