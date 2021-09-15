import React, { useEffect, useState, useRef } from 'react';

import Menu from './menu';
import Grid from './grid';
import Stats from './stats';
import useInterval from './use-interval';

const Game = () => {
  const secondsCounter = useRef();

  const [updateGrid, setUpdateGrid] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [isCheating, setisCheating] = useState(false);
  const [gameSize, setGameSize] = useState(8);
  const [numMines, setNumMines] = useState(8);
  const [numClicks, setNumClicks] = useState(0);
  const [numSeconds, setNumSeconds] = useState(0);
  const [numFlags, setNumFlags] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (gameStatus === 'win' || gameStatus === 'lose') {
      clearInterval(secondsCounter.current);
      secondsCounter.current = null;
    }
  }, [gameStatus]);

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

  const updateGameStatus = (status) => {
    setGameStatus(status);
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

  const getSaveData = () => {
    return {
      updateGrid,
      gameStatus,
      isCheating,
      gameSize,
      numMines,
      numClicks,
      numSeconds,
      numFlags,
      rows
    };
  };

  const setSavedData = (savedData) => {
    setUpdateGrid(savedData.updateGrid);
    setGameStatus(savedData.gameStatus);
    setisCheating(savedData.isCheating);
    setGameSize(savedData.gameSize);
    setNumMines(savedData.numMines);
    setNumClicks(savedData.numClicks);
    setNumSeconds(savedData.numSeconds);
    setNumFlags(savedData.numFlags);
    setRows(savedData.rows);
  };

  const resetGame = () => {
    setNumClicks(0);
    setNumSeconds(0);
    setNumFlags(0);
    setUpdateGrid(false);
    setisCheating(false);
  };

  const newGameModalData = {
    gameSize,
    onGameSizeChange,
    numMines,
    onMineNumberChange,
    updateGameStatus,
    setUpdateGrid
  };

  const cheatModalData = {
    gameStatus,
    setisCheating
  };

  const saveModalData = {
    gameStatus,
    getSaveData
  };

  const loadModalData = {
    gameStatus,
    setSavedData
  };

  return (
    <div>
      <Menu
        newGameModalData={newGameModalData}
        cheatModalData={cheatModalData}
        saveModalData={saveModalData}
        loadModalData={loadModalData}
      />
      <Grid
        updateGrid={updateGrid}
        setUpdateGrid={setUpdateGrid}
        gameStatus={gameStatus}
        gameSize={gameSize}
        numMines={numMines}
        numFlags={numFlags}
        isCheating={isCheating}
        setisCheating={setisCheating}
        incrementClicks={incrementClicks}
        updateFlags={updateFlags}
        updateGameStatus={updateGameStatus}
        resetGame={resetGame}
        rows={rows}
        setRows={setRows}
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
