import React from 'react';


const Menu = () => {
  return (
    <nav className='menu'>
      <button className='button start'><span className='sprite new'></span> New Game</button>
      <button className='button save'><span className='sprite saver'></span> Save Game</button>
      <button className='button load'><span className='sprite loader'></span> Load Game</button>
      <button className='button cheat'><span className='sprite cheater'></span> Cheat</button>
      <button className='button help'><span className='sprite helper'></span> Help</button>
      <button className='button validate'><span className='sprite smiley'></span> Validate</button>
    </nav>
  );
};

export default Menu;
