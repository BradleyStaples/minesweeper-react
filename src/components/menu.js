import React from 'react';

import NewGameButtonAndModal from './modal-new-game';
import CheatButtonAndModal from './modal-cheat';
import HelpButtonAndModal from './modal-help';

const Menu = ({ newGameModalData, cheatModalData }) => {

  return (
    <nav className='menu'>
      <NewGameButtonAndModal {...newGameModalData} />
      <button className='button'>
        <span className='sprite saver'></span> Save Game
      </button>
      <button className='button'>
        <span className='sprite loader'></span> Load Game
      </button>
      <CheatButtonAndModal {...cheatModalData} />
      <HelpButtonAndModal />
    </nav>
  );
};

export default Menu;
