import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import Cell from './cell';
import {
  createRows,
  randomizeMines,
  calculateNearbyMines,
  revealEmptyCells,
  enableCheating
} from './grid-utils';

const Grid = ({
  updateGrid,
  gameStatus,
  gameSize,
  numMines,
  isCheating,
  setisCheating,
  incrementClicks,
  updateFlags,
  updateGameStatus,
  resetGame
}) => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (gameStatus === 'playing' && updateGrid) {
      let tempRows = createRows(gameSize);
      randomizeMines(tempRows, numMines);
      calculateNearbyMines(tempRows);
      setRows(tempRows);
      resetGame();
    }
  }, [gameStatus, gameSize, numMines, updateGrid, resetGame]);

  useEffect(() => {
    if (isCheating) {
      let newRows = rows.slice(0);
      enableCheating(newRows);
      setRows(newRows);
      setisCheating(false);
    }

  }, [isCheating, rows]);

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
        // reveal only this one cell, as it's not "empty"
        cell.revealed = true;
      } else {
        // cell is empty, reveal the cell and contiguous empty cells as well
        revealEmptyCells(newRows, rowIndex, cellIndex)
      }
    }
    setRows(newRows);
    incrementClicks();
    console.log('cell clicked at: ', rowIndex, cellIndex, '\n  cellData: ', cell);
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
