// directions in x/y coordinates for each adjacent cell
// for reference: 0, 0 is the cell itself
const directions = [
  { c: -1, r: +0 },	// left center
  { c: -1, r: +1 },	// top left
  { c: +0, r: +1 },	// top center
  { c: +1, r: +1 },	// top right
  { c: +1, r: +0 },	// right center
  { c: +1, r: -1 },	// bottom right
  { c: +0, r: -1 },	// bottom center
  { c: -1, r: -1 }	// bottom left;
];

const createRows = (gameSize) => {
  let tempRows = [];
  let i;
  for (i = 0; i < gameSize; i++) {
    let tempRow = [];
    let j;
    for (j = 0; j < gameSize; j++) {
      let cell = {
        revealed: false,
        mined: false,
        flagged: false,
        cheated: false,
        missed: false,
        surroundingMines: 0
      };
      tempRow.push(cell);
    }
    tempRows.push(tempRow);
  }
  return tempRows;
};

const _plantMine = (cell) => {
  if (!cell || !cell.hasOwnProperty('mined')) {
    return false;
  }
  if (cell.mined) {
    return false;
  }
  cell.mined = true;
  return true;
};

const randomizeMines = (tempRows, numMines) => {
  let minesPlanted = 0;
  let gridSize = tempRows.length;
  while (minesPlanted < numMines) {
    // get a random row (r) and col (c) coordinate from 0 to gridSize-1
    let r = Math.floor(Math.random() * gridSize);
    let c = Math.floor(Math.random() * gridSize);
    // plantMine() returns true if a mine was not already planted (while planting the mine),
    // otherwise returns false if a mine already exists in that cell
    if (_plantMine(tempRows[r][c])) {
      minesPlanted += 1;
    }
  }
};

const _getCell = (tempRows, r, c, direction) => {
  let newRow = r + direction.r;
  let newCell = c + direction.c;

  if (newRow >= 0 && newRow < tempRows.length && newCell >= 0 && newCell < tempRows.length) {
    // verify that the array element exists
    if (tempRows[newRow][newCell]) {
      // return the array element
      return tempRows[newRow][newCell];
    }
  }
  // no array element was found, return null
  return null;
};

const calculateNearbyMines = (tempRows) => {
  let surroundingMines;
  tempRows.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      surroundingMines = 0;
      directions.forEach((direction, directionIndex) => {
        let cell = _getCell(tempRows, rowIndex, cellIndex, direction);
        if (cell && cell.mined) {
          surroundingMines += 1;
        }
      });
      tempRows[rowIndex][cellIndex].surroundingMines = surroundingMines;
    });
  });
};

const revealEmptyCells = (tempRows, rowIndex, cellIndex) => {
  // since adjacent cells next to the edge can be 'off' the game board,
  // make sure cell is within range. return if not to halt recursive calls
  if (rowIndex < 0 || rowIndex >= tempRows.length || cellIndex < 0 || cellIndex >= tempRows.length) {
    return;
  }
  let thisCellDirection = {
    r: 0,
    c: 0
  };
  let cell = _getCell(tempRows, rowIndex, cellIndex, thisCellDirection);
  if (cell.revealed || cell.flagged || cell.mined || cell.surroundingMines > 0) {
    return;
  }
  cell.revealed = true;
  // recursively call each cell adjacent to this cell
  // (which will in turn recursively call cells adjacent to all of these adjacent cells, etc)
  directions.forEach((direction) => {
    revealEmptyCells(tempRows, rowIndex + direction.r, cellIndex + direction.c);
  });
};

const enableCheating = (tempRows) => {
  let thisCellDirection = {
    r: 0,
    c: 0
  };
  let rowIndex;
  for (rowIndex = 0; rowIndex < tempRows.length; rowIndex++) {
    let cellIndex;
    for (cellIndex = 0; cellIndex < tempRows.length; cellIndex++) {
      let cell = _getCell(tempRows, rowIndex, cellIndex, thisCellDirection);
      if (cell.mined) {
        cell.cheated = true;
      }
    }
  }
};

const validateAllMinesFlagged = (tempRows) => {
  let thisCellDirection = {
    r: 0,
    c: 0
  };
  let gameStatus = 'win';
  let rowIndex;
  for (rowIndex = 0; rowIndex < tempRows.length; rowIndex++) {
    let cellIndex;
    for (cellIndex = 0; cellIndex < tempRows.length; cellIndex++) {
      let cell = _getCell(tempRows, rowIndex, cellIndex, thisCellDirection);
      if (cell.mined && !cell.flagged) {
        cell.revealed = true;
        cell.missed = true;
        gameStatus = 'lose';
      }
      if (cell.flagged && !cell.mined) {
        cell.missed = true;
        gameStatus = 'lose';
      }
    }
  }
  return gameStatus;
};

const countRevealedCells = (tempRows) => {
  let thisCellDirection = {
    r: 0,
    c: 0
  };
  let count = 0;
  let rowIndex;
  for (rowIndex = 0; rowIndex < tempRows.length; rowIndex++) {
    let cellIndex;
    for (cellIndex = 0; cellIndex < tempRows.length; cellIndex++) {
      let cell = _getCell(tempRows, rowIndex, cellIndex, thisCellDirection);
      if (cell.revealed) {
        count += 1;
      }
    }
  }
  return count;
};

const validateAllUnminedCellsRevealed = (tempRows) => {
  let thisCellDirection = {
    r: 0,
    c: 0
  };
  let gameStatus = 'win';
  let rowIndex;
  for (rowIndex = 0; rowIndex < tempRows.length; rowIndex++) {
    let cellIndex;
    for (cellIndex = 0; cellIndex < tempRows.length; cellIndex++) {
      let cell = _getCell(tempRows, rowIndex, cellIndex, thisCellDirection);
      if (!cell.mined && !cell.revealed) {
        cell.missed = true;
        gameStatus = 'lose';
      }
    }
  }
  return gameStatus;
};

export {
  createRows,
  randomizeMines,
  calculateNearbyMines,
  revealEmptyCells,
  enableCheating,
  validateAllMinesFlagged,
  countRevealedCells,
  validateAllUnminedCellsRevealed
};
