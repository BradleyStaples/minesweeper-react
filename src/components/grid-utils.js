const createRows = (gameSize) => {
  let tempRows = [];
  let i;
  for (i = 0; i < gameSize; i++) {
    let tempRow = [];
    let j;
    for (j = 0; j < gameSize; j++) {
      let cell = {
        revealed: false,
        bombed: false,
        flagged: false,
        surroundingMines: 0
      };
      tempRow.push(cell);
    }
    tempRows.push(tempRow);
  }
  return tempRows;
};

const _plantMine = (cell) => {
  if (!cell || !cell.hasOwnProperty('bombed')) {
    return false;
  }
  if (cell.bombed) {
    return false;
  }
  cell.bombed = true;
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
      console.log('mine planted at: ', r, c, '\n   mines remaining: ', numMines - minesPlanted);
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
      return tempRows[newRow][newCell].bombed;
    }
  }
  // no array element was found, return null
  return null;
};

const calculateNearbyMines = (tempRows) => {
  // directions in x/y coordinates for each adjacent cell
  // for reference: 0, 0 is the cell itself
  let directions = [
    { c: -1, r: +0 },	// left center
    { c: -1, r: +1 },	// top left
    { c: +0, r: +1 },	// top center
    { c: +1, r: +1 },	// top right
    { c: +1, r: +0 },	// right center
    { c: +1, r: -1 },	// bottom right
    { c: +0, r: -1 },	// bottom center
    { c: -1, r: -1 }	// bottom left;
  ];

  let surroundingMines;
  tempRows.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      surroundingMines = 0;
      directions.forEach((direction, directionIndex) => {
        let cell = _getCell(tempRows, rowIndex, cellIndex, direction);
        if (cell) {
          surroundingMines += 1;
        }
      });
      tempRows[rowIndex][cellIndex].surroundingMines = surroundingMines;
    });
  });
};

export {
  createRows,
  randomizeMines,
  calculateNearbyMines
};
