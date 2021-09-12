import React from 'react';
import Modali, { useModali } from 'modali';

const CheatButtonAndModal = () => {

  const [helpModal, toggleHelpModal] = useModali({
    animated: true,
    overlayClose: false,
    centered: true,
    title: 'Help',
    buttons: [
      <Modali.Button
        label='Close'
        isStyleDefault
        onClick={() => toggleHelpModal()}
      />
    ]
  });

  return (
    <div className='menu-item'>
      <button className='button' onClick={toggleHelpModal}>
        <span className='sprite helper'></span> Help
      </button>
      <Modali.Modal {...helpModal}>
        <div>
          <p>
            <strong>Click</strong> a cell to uncover it. <strong>Right-click</strong> a cell to flag that cell as containing a mine. <strong>Right-click</strong> again on a cell with a flag to remove the flag.
          </p>
          <p>
            Uncovered cells that are empty indicate that no adjacent cells have mines. Uncovered cells with numbers inside of them indicate how many adjacement cells have mines. Uncover all un-mined cells without uncovering any mined cells to win. You can also win by flagging all cells that contain mines.
          </p>
          <p>
            You can cheat to reveal which cells have mines.
          </p>
        </div>
      </Modali.Modal>
    </div>
  );
};

export default CheatButtonAndModal;
