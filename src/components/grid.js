import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import Cell from './cell';
import { createRows, randomizeMines, calculateNearbyMines } from './grid-utils';

const Grid = ({ gameStatus, gameSize, numMines, incrementClicks, updateFlags }) => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (gameStatus === 'playing') {
      let tempRows = createRows(gameSize);
      randomizeMines(tempRows, numMines);
      calculateNearbyMines(tempRows);
      setRows(tempRows);
      // reset stats
    }
  }, [gameStatus, gameSize, numMines]);

  const onCellClick = (rowIndex, cellIndex, toggleFlag) => {
    let newRows = rows.slice(0);
    let cell = newRows[rowIndex][cellIndex];
    if (toggleFlag) {
      // was a right click, toggle the flag
      const newStatus = !cell.flagged;
      updateFlags(newStatus);
      cell.flagged = newStatus;
    } else {
      // was a left click, revel the cell
      cell.revealed = true;
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
                    bombed={cell.bombed}
                    flagged={cell.flagged}
                    gameStatus={gameStatus}
                    surroundingMines={cell.surroundingMines}
                    onCellClick={onCellClick}
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
