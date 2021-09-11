import React from 'react';
import Modali, { useModali } from 'modali';

const NewGameButtonAndModal = ({
  gameSize,
  onGameSizeChange,
  numMines,
  onMineNumberChange,
  onGameStart
}) => {

  const [newGameModal, toggleNewGameModal] = useModali({
    animated: true,
    overlayClose: false,
    centered: true,
    title: 'New Game',
    buttons: [
      <Modali.Button
        label='Cancel'
        isStyleCancel
        onClick={() => toggleNewGameModal()}
      />,
      <Modali.Button
        label='Continue'
        isStyleDefault
        onClick={() => onContinue()}
      />,
    ],
  });

  const onContinue = function (event) {
    onGameStart();
    toggleNewGameModal();
  };

  return (
    <div className='menu-item'>
      <button className='button start' onClick={toggleNewGameModal}>
        <span className='sprite new'></span> New Game
      </button>
      <Modali.Modal {...newGameModal}>
        <div>
          <p>Choose a game size and the number of mines you want in your grid, and then enjoy!</p><br />
          <label>
            <span>Game Size:</span>
            <select className='gameSize' value={gameSize} onChange={onGameSizeChange}>
              <option value='8'>8x8</option>
              <option value='16'>16x16</option>
              <option value='32'>32x32</option>
            </select>
          </label>
          <label>
            <span># of Mines:</span>
            <input type='number' className='numMines' value={numMines} onChange={onMineNumberChange} />
          </label>
        </div>
      </Modali.Modal>
    </div>
  );
};

export default NewGameButtonAndModal;
