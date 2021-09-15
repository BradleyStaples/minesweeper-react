import React from 'react';
import classnames from 'classnames';

const Cell = ({
  rowIndex,
  cellIndex,
  revealed,
  mined,
  flagged,
  cheated,
  missed,
  gameStatus,
  surroundingMines,
  onCellClick,
  updateGameStatus
}) => {

  const clickHandler = (event) => {
    if (revealed || gameStatus === 'win' || gameStatus === 'lose') {
      return false;
    }
    console.log({revealed, mined, flagged, cheated, missed, surroundingMines}, 'cell clicked at: ', rowIndex, cellIndex);
    if (mined) {
      updateGameStatus('lose');
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
    cheated: !revealed && cheated,
    miss: missed,
    unknown: !revealed && !flagged,
    'sprite flagged': !revealed && flagged,
    empty: revealed && surroundingMines === 0,
    'sprite mined': revealed && mined,
    'sprite one': revealed && !mined && surroundingMines === 1,
    'sprite two': revealed && !mined && surroundingMines === 2,
    'sprite three': revealed && !mined && surroundingMines === 3,
    'sprite four': revealed && !mined && surroundingMines === 4,
    'sprite five': revealed && !mined && surroundingMines === 5,
    'sprite six': revealed && !mined && surroundingMines === 6,
    'sprite seven': revealed && !mined && surroundingMines === 7,
    'sprite eight': revealed && !mined && surroundingMines === 8
  });

  return (
    <td>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button className={buttonClasses} onClick={clickHandler} onContextMenu={rightClickHandler} />
    </td>
  );
};

export default Cell;
