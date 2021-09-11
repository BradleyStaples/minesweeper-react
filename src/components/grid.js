import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import Cell from './cell';
import { createRows, randomizeMines, calculateNearbyMines } from './grid-utils';

const Grid = ({ gameStarted, gameSize, mineNumber }) => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (gameStarted) {
      let tempRows = createRows(gameSize);
      randomizeMines(tempRows, mineNumber);
      calculateNearbyMines(tempRows);
      setRows(tempRows);
    }
  }, [gameStarted, gameSize, mineNumber]);

  const onCellClick = (rowIndex, cellIndex, toggleFlag) => {
    let newRows = rows.slice(0);
    let cell = newRows[rowIndex][cellIndex];
    if (toggleFlag) {
      // was a right click, toggle the flag
      cell.flagged = !cell.flagged;
    } else {
      // was a left click, revel the cell
      cell.revealed = true;
    }
    setRows(newRows);
    console.log('cell clicked at: ', rowIndex, cellIndex, '\n  cellData: ', cell);
  };

  const gridClasses = classnames({
    grid: true,
    hidden: !gameStarted
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
