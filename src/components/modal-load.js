import React, { useState } from 'react';
import Modali, { useModali } from 'modali';

const LoadButtonAndModal = ({ gameStatus, setSavedData}) => {

  let [loadStatus, setLoadStatus] = useState('');

  const loadData = () => {
    let saveData = undefined;
    let loadStatus = 'loaded';
    try {
      let windowGlobal = typeof window !== 'undefined' && window;
      if (!windowGlobal) {
        throw new Error('Window is not defined');
      }
      saveData = windowGlobal.localStorage.getItem('saveGameData');
      if (!saveData) {
        loadStatus = 'missing';
      } else {
        saveData = JSON.parse(saveData);
        setSavedData(saveData);
      }
    } catch (error) {
      console.error(`Error loading game: ${error}`);
      loadStatus = 'error';
    }
    setLoadStatus(loadStatus);
    return saveData;
  };

  let buttons = [
    <Modali.Button
      label='Cancel'
      isStyleCancel
      onClick={() => closeModal()}
    />,
    <Modali.Button
      label='Load'
      isStyleDefault
      onClick={() => loadData()}
    />,
  ];

  if (loadStatus === 'loaded') {
    buttons = [
      <Modali.Button
        label='Close'
        isStyleDefault
        onClick={() => closeModal()}
      />
    ];
  }

  const [loadModal, toggleLoadModal] = useModali({
    animated: true,
    overlayClose: false,
    centered: true,
    title: 'Load Game',
    buttons
  });

  const closeModal = () => {
    setLoadStatus('');
    toggleLoadModal();
  };

  const renderContent = () => {
    if (loadStatus === 'missing') {
      return (
        <div>
          <h2><strong>Error</strong></h2>
          <p>No save game data was found to load. Please save a game first in order to load it later.</p>
        </div>
      );
    }
    if (loadStatus === 'error') {
      return (
        <div>
          <h2><strong>Load Failed</strong></h2>
          <p>Your game could not be loaded.</p>
        </div>
      );
    }
    if (loadStatus === 'loaded') {
      return (
        <div>
          <h2><strong>Load Successful</strong></h2>
          <p>Your game has been loaded.</p>
        </div>
      );
    }
    if (gameStatus === 'playing') {
      return (
        <div>
          <p>Are you sure you wish to stop the current game and load a new one?</p>
        </div>
      )
    }
    return (
      <div>
        <p>Hit 'load' to load your previously saved game.</p>
      </div>
    )
  };

  return (
    <div className='menu-item'>
      <button className='button' onClick={toggleLoadModal}>
        <span className='sprite loader'></span> Load Game
      </button>
      <Modali.Modal {...loadModal}>
        {renderContent()}
      </Modali.Modal>
    </div>
  );
};

export default LoadButtonAndModal;
