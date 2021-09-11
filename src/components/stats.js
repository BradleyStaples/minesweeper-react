import React from 'react';
import classnames from 'classnames';

const Stats = ({ gameStatus, numClicks, numSeconds, numMinesRemaining }) => {

  const statsClasses = classnames({
    stats: true,
    hidden: !gameStatus // if gameStatus is anything but '', show grid
  });

  const gameResultClasses = classnames({
    gameresult: true,
    hidden: (gameStatus !== 'win' && gameStatus !== 'lose')
  });

  return (
    <div>
      <div className={statsClasses}>
        <div className='sprite mouse'>
          <span className='clicks'>{numClicks}</span>
        </div>
        <div className='sprite clock'>
          <span className='time'>{numSeconds}</span>
        </div>
        <div className='sprite bomb'>
          <span className='mines'>{numMinesRemaining}</span>
        </div>
      </div>
      <h1 className={gameResultClasses}>
        {(gameStatus === 'win' || gameStatus === 'lose') &&
          <span>You {gameStatus}!</span>
        }
      </h1>
    </div>
  );
};

export default Stats;
