import React from 'react';

import Menu from './menu';
import Grid from './grid';
import Stats from './stats';

const Game = () => {
  return (
    <div>
      <Menu />
      <Grid />
      <Stats />
      <div className='overlay hidden'>
        <div className='modal'></div>
      </div>
    </div>
  );
};

export default Game;
