import React from 'react';
import { Helmet } from 'react-helmet';

import '../styles/minesweeper.scss';

const Page = ({ title, children }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title}</title>
        <link rel='canonical' href='https://minesweeper.bradleystaples.com/' />
        <meta name='description' content='A simple game that lets you flag mines, show empty squares, keeps score and even cheat, if you’re so inclined. In addition, you can save and load your game later.' />
        <meta name='author' content='Bradley Staples' />
        <link rel='shortcut' href='/favicon.ico' />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <link href='https://fonts.googleapis.com/css?family=Arapey' rel='stylesheet' type='text/css' />
      </Helmet>
      {children}
    </div>
  )
};

export default Page;
