import { Board } from '@/components/board';
import { Button } from '@/components/ui/button';
import useGameStocket from '@/hooks/useGameStocket';
import { createLazyFileRoute } from '@tanstack/react-router';
import Lottie from 'lottie-react';
import confettiAnimation from '@/assets/confetti-animation.json';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { myMark, game, connect, playAgain } = useGameStocket();
  return (
    <div className="flex items-center justify-center h-[calc(100svh-68px)]">
      {!game?.status ? (
        <Button className="uppercase" onClick={connect}>
          Start Game
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {game?.status === 'waiting' && (
            <p className="mb-12 text-2xl text-yellow-500 uppercase">
              Waiting for oppenent to join...
            </p>
          )}
          {game.winner === myMark ? (
            <p className="mb-12 text-2xl text-green-500 uppercase">You win!</p>
          ) : game.winner === 'draw' ? (
            <p className="mb-12 text-2xl text-gray-500 uppercase">Draw</p>
          ) : game.winner ? (
            <p className="mb-12 text-2xl text-red-500 uppercase">You lose!</p>
          ) : null}

          {!!game?.current?.mark && !game.winner && (
            <div className="flex items-center">
              Turn:{' '}
              <span className="ml-1 text-lg font-bold">
                {game.current.mark}
              </span>
            </div>
          )}

          <div className="relative flex items-center justify-center ">
            <Board />
            {game?.winner === myMark && (
              <div className="absolute pointer-events-none">
                <Lottie animationData={confettiAnimation} loop />
              </div>
            )}
          </div>

          {!!myMark && !game.winner && (
            <div className="flex items-center mt-4">
              You're <span className="ml-1 text-lg font-bold">{myMark}</span>
            </div>
          )}

          {!!game.winner && (
            <Button className="mt-12 uppercase" onClick={playAgain}>
              Play again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
