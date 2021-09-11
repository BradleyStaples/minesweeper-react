import React from 'react';
import Modali, { useModali } from 'modali';

const CheatButtonAndModal = ({ gameStatus, setisCheating }) => {

  let buttons = [
    <Modali.Button
      label='Cancel'
      isStyleCancel
      onClick={() => toggleCheatModal()}
    />,
    <Modali.Button
      label='Continue'
      isStyleDefault
      onClick={() => onContinue()}
    />,
  ];

  if (gameStatus !== 'playing') {
    buttons = [
      <Modali.Button
        label='Close'
        isStyleDefault
        onClick={() => toggleCheatModal()}
      />
    ];
  }

  const [cheatModal, toggleCheatModal] = useModali({
    animated: true,
    overlayClose: false,
    centered: true,
    title: 'Cheat',
    buttons
  });

  const onContinue = function (event) {
    setisCheating(true);
    toggleCheatModal();
  };

  return (
    <div className='menu-item'>
      <button className='button' onClick={toggleCheatModal}>
        <span className='sprite cheater'></span> Cheat
      </button>
      <Modali.Modal {...cheatModal}>
        <div>
          { (gameStatus === 'playing')
          ?
            <div>
              <h2><strong>Are you sure?</strong></h2>
              <p>Cheating is a dirty habit, you know.</p>
              <p>
                If you're sure you want to cheat, I won't tell... All cells that contain mines will be outlined in red so you won't get your cheating dainty hands dirty.
              </p>
            </div>
          :
            <div>
              <h2><strong>Error</strong></h2>
              <p>You must be actively playing a game in order to cheat.</p>
            </div>
          }
        </div>
      </Modali.Modal>
    </div>
  );
};

export default CheatButtonAndModal;
