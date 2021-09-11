import React from 'react';
import classnames from 'classnames';

const Cell = ({ rowIndex, cellIndex, revealed, bombed, flagged, gameStatus, surroundingMines, onCellClick }) => {

  const clickHandler = (event) => {
    if (revealed || gameStatus === 'win' || gameStatus === 'lose') {
      return false;
    }
    onCellClick(rowIndex, cellIndex);
  };

  const rightClickHandler = (event) => {
    if (revealed || gameStatus === 'win' || gameStatus === 'lose') {
      return false;
    }
    event.preventDefault(); // prevent browser context menu
    onCellClick(rowIndex, cellIndex, true);
  };

  const buttonClasses = classnames({
    cellButton: true,
    unknown: !revealed && !flagged,
    'sprite flagged': !revealed && flagged,
    empty: revealed && surroundingMines === 0,
    'sprite mined': revealed && bombed,
    'sprite one': revealed && !bombed && surroundingMines === 1,
    'sprite two': revealed && !bombed && surroundingMines === 2,
    'sprite three': revealed && !bombed && surroundingMines === 3,
    'sprite four': revealed && !bombed && surroundingMines === 4,
    'sprite five': revealed && !bombed && surroundingMines === 5,
    'sprite six': revealed && !bombed && surroundingMines === 6,
    'sprite seven': revealed && !bombed && surroundingMines === 7,
    'sprite eight': revealed && !bombed && surroundingMines === 8
  });

  return (
    <td>
      <button className={buttonClasses} onClick={clickHandler} onContextMenu={rightClickHandler} />
    </td>
  );
};

export default Cell;
