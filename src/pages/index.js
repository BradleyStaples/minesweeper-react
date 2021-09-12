import React from 'react';

import Page from '../components/page';
import Game from '../components/game';
import Footer from '../components/footer';

const IndexPage = () => {
  return (
    <Page title='Minesweeper'>
      <div className='wrapper clearfix'>
        <h1 className='center'>Minesweeper</h1>
        <Game />
        <Footer />
      </div>
    </Page>
  )
};

export default IndexPage;
