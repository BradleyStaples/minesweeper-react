import React, { useEffect, useState, useRef } from 'react';

import Menu from './menu';
import Grid from './grid';
import Stats from './stats';
import useInterval from './use-interval';

const Game = () => {
  const secondsCounter = useRef();

  const [gameStatus, setGameStatus] = useState('');
  const [gameSize, setGameSize] = useState(8);
  const [numMines, setNumMines] = useState(8);
  const [numClicks, setNumClicks] = useState(0);
  const [numSeconds, setNumSeconds] = useState(0);
  const [numFlags, setNumFlags] = useState(0);

  useEffect(() => {
    if (gameStatus === 'win' || gameStatus === 'lose') {
      clearInterval(secondsCounter.current);
      secondsCounter.current = null;
    }
  }, [gameStatus]);

  useEffect(() => {
    if (numFlags === numMines) {
      // TODO: calculate win or loss
      setGameStatus('win');
    }
  }, [numFlags]);

  secondsCounter.current = useInterval(() => {
    setNumSeconds(numSeconds => numSeconds + 1);
  }, gameStatus === 'playing' ? 1000 : null);

  const onGameSizeChange = (event) => {
    var v = event.target.value;
    setGameSize(v);
  };

  const onMineNumberChange = (event) => {
    // TODO: verify is an integer, error-handling
    var v = event.target.value;
    setNumMines(v);
  };

  const onGameStart = () => {
    setGameStatus('playing');
  };

  const incrementClicks = () => {
    setNumClicks(numClicks => numClicks + 1);
  };

  const updateFlags = (flagAdded) => {
    if (flagAdded) {
      setNumFlags(numClicks => numClicks + 1);
    } else {
      setNumFlags(numClicks => numClicks - 1);
    }
  };

  const newGameModalData = {
    gameSize,
    onGameSizeChange,
    numMines,
    onMineNumberChange,
    onGameStart
  };

  return (
    <div>
      <Menu
        newGameModalData={newGameModalData}
      />
      <Grid
        gameStatus={gameStatus}
        gameSize={gameSize}
        numMines={numMines}
        incrementClicks={incrementClicks}
        updateFlags={updateFlags}
      />
      <Stats
        gameStatus={gameStatus}
        numClicks={numClicks}
        numSeconds={numSeconds}
        numMinesRemaining={numMines - numFlags}
      />
    </div>
  );
};

export default Game;
