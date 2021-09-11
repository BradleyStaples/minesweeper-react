import React, { useState } from 'react';

import Menu from './menu';
import Grid from './grid';
import Stats from './stats';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSize, setGameSize] = useState(8);
  const [mineNumber, setMineNumber] = useState(8);

  const onGameSizeChange = (event) => {
    var v = event.target.value;
    setGameSize(v);
  };

  const onMineNumberChange = (event) => {
    // verify is an integer
    var v = event.target.value;
    setMineNumber(v);
  };

  const onGameStart = () => {
    setGameStarted(true);
  };

  const newGameModalData = {
    gameSize,
    onGameSizeChange,
    mineNumber,
    onMineNumberChange,
    onGameStart
  };

  return (
    <div>
      <Menu
        newGameModalData={newGameModalData}
      />
      <Grid
        gameStarted={gameStarted}
        gameSize={gameSize}
        mineNumber={mineNumber}
      />
      <Stats />
    </div>
  );
};

export default Game;
