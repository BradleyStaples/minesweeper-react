import React from 'react';

import NewGameButtonAndModal from './modal-new-game';
import SaveButtonAndModal from './modal-save';
import LoadButtonAndModal from './modal-load';
import CheatButtonAndModal from './modal-cheat';
import HelpButtonAndModal from './modal-help';

const Menu = ({ newGameModalData, cheatModalData, saveModalData, loadModalData }) => {

  return (
    <nav className='menu'>
      <NewGameButtonAndModal {...newGameModalData} />
      <SaveButtonAndModal {...saveModalData} />
      <LoadButtonAndModal {...loadModalData} />
      <CheatButtonAndModal {...cheatModalData} />
      <HelpButtonAndModal />
    </nav>
  );
};

export default Menu;
