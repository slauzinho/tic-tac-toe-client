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
  const { myMark, game, connect } = useGameStocket();
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

          {!!game?.current?.mark && (
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

          {!!myMark && (
            <div className="flex items-center mt-4">
              You're <span className="ml-1 text-lg font-bold">{myMark}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
