import React, { useState } from 'react';
import Modali, { useModali } from 'modali';

const SaveButtonAndModal = ({ gameStatus, getSaveData }) => {

  let [saveStatus, setSaveStatus] = useState('');

  const saveData = () => {
    let status = 'error';
    try {
      let windowGlobal = typeof window !== 'undefined' && window;
      let saveData = getSaveData();
      if (windowGlobal) {
        windowGlobal.localStorage.setItem('saveGameData', JSON.stringify(saveData));
        status = 'saved';
      } else {
        throw new Error('Window is not defined');
      }
    } catch (error) {
      console.error(`Error saving game: ${error}`);
      status = 'error';
    }
    setSaveStatus(status);
  };

  let buttons = [
    <Modali.Button
      label='Cancel'
      isStyleCancel
      onClick={() => toggleSaveModal()}
    />,
    <Modali.Button
      label='Save'
      isStyleDefault
      onClick={() => saveData()}
    />,
  ];

  if (gameStatus !== 'playing' || saveStatus === 'saved') {
    buttons = [
      <Modali.Button
        label='Close'
        isStyleDefault
        onClick={() => toggleSaveModal()}
      />
    ];
  }

  const [saveModal, toggleSaveModal] = useModali({
    animated: true,
    overlayClose: false,
    centered: true,
    title: 'Save Game',
    buttons
  });

  const renderContent = () => {
    if (gameStatus !== 'playing') {
      return (
        <div>
          <h2><strong>Error</strong></h2>
          <p>You must be actively playing a game in order to <strong>save</strong>.</p>
        </div>
      );
    }
    if (saveStatus === 'error') {
      return (
        <div>
          <h2><strong>Save Failed</strong></h2>
          <p>Your game could not be saved.</p>
        </div>
      );
    }
    if (saveStatus === 'saved') {
      return (
        <div>
          <h2><strong>Save Successful</strong></h2>
          <p>Your game data has been saved.</p>
        </div>
      );
    }
    return (
      <div>
        <p>Hit 'save' to save your game.</p>
      </div>
    )
  };

  return (
    <div className='menu-item'>
      <button className='button' onClick={toggleSaveModal}>
        <span className='sprite saver'></span> Save Game
      </button>
      <Modali.Modal {...saveModal}>
        {renderContent()}
      </Modali.Modal>
    </div>
  );
};

export default SaveButtonAndModal;
