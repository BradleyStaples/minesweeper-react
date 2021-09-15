import React, { useEffect } from 'react';
import classnames from 'classnames';

import Cell from './cell';
import {
  createRows,
  randomizeMines,
  calculateNearbyMines,
  revealEmptyCells,
  enableCheating,
  validateAllMinesFlagged,
  countRevealedCells,
  validateAllUnminedCellsRevealed
} from './grid-utils';

const Grid = ({
  updateGrid,
  gameStatus,
  gameSize,
  numMines,
  numFlags,
  isCheating,
  setisCheating,
  incrementClicks,
  updateFlags,
  updateGameStatus,
  resetGame,
  rows,
  setRows
}) => {

  useEffect(() => {
    if (gameStatus === 'playing' && updateGrid) {
      let tempRows = createRows(gameSize);
      randomizeMines(tempRows, numMines);
      calculateNearbyMines(tempRows);
      setRows(tempRows);
      resetGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, gameSize, numMines, updateGrid, resetGame]);

  useEffect(() => {
    console.log({ gameStatus, numFlags, numMines}, 'inside useEffect');
    if (gameStatus === 'playing' && numFlags === numMines) {
      let newRows = rows.slice(0);
      let gameStatus = validateAllMinesFlagged(newRows);
      setRows(newRows);
      updateGameStatus(gameStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, gameSize, numMines, numFlags]);

  useEffect(() => {
    if (gameStatus === 'playing') {
      let newRows = rows.slice(0);
      let numRevealed = countRevealedCells(newRows);
      let totalCells = gameSize * gameSize;
      let numUnmined = totalCells - numMines;
      if (numRevealed === numUnmined) {
        let gameStatus = validateAllUnminedCellsRevealed(newRows);
        updateGameStatus(gameStatus);
        setRows(newRows);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, gameSize, numMines, rows]);

  useEffect(() => {
    if (isCheating) {
      let newRows = rows.slice(0);
      enableCheating(newRows);
      setRows(newRows);
      setisCheating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheating, rows, setisCheating]);

  const onCellClick = (rowIndex, cellIndex, toggleFlag) => {
    let newRows = rows.slice(0);
    let cell = newRows[rowIndex][cellIndex];
    if (toggleFlag) {
      // was a right click, toggle the flag
      const newStatus = !cell.flagged;
      updateFlags(newStatus);
      cell.flagged = newStatus;
    } else {
      // was a left click
      if (cell.surroundingMines !== 0) {
        // reveal only this one cell, as its not "empty"
        cell.revealed = true;
      } else if (cell.mined) {
        // reveal only this one cell, as its mined
        cell.revealed = true;
      } else {
        // cell is empty, reveal the cell and contiguous empty cells as well
        revealEmptyCells(newRows, rowIndex, cellIndex)
      }
    }
    setRows(newRows);
    incrementClicks();
  };

  const gridClasses = classnames({
    grid: true,
    hidden: !gameStatus // if gameStatus is anything but '', show grid
  });

  return (
    <table className={gridClasses}>
      <tbody>
        {rows.map(function (row, rowIndex) {
          return (
            <tr key={`row-${rowIndex}`}>
              {row.map(function (cell, cellIndex) {
                return (
                  <Cell
                    key={`row-${rowIndex}-cell-${cellIndex}`}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    revealed={cell.revealed}
                    mined={cell.mined}
                    flagged={cell.flagged}
                    cheated={cell.cheated}
                    missed={cell.missed}
                    gameStatus={gameStatus}
                    surroundingMines={cell.surroundingMines}
                    onCellClick={onCellClick}
                    updateGameStatus={updateGameStatus}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
