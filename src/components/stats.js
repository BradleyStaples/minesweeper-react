import React from 'react';

const Stats = () => {
  return (
    <div className='stats hidden'>
      <div className='sprite mouse'>
        <span className='clicks'>0</span>
      </div>
      <div className='sprite clock'>
        <span className='time'>0</span>
      </div>
      <div className='sprite bomb'>
        <span className='mines'>0</span>
      </div>
    </div>
  );
};

export default Stats;
