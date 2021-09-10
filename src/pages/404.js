import React from 'react';
import { Link } from 'gatsby';

import Page from '../components/page';
import Footer from '../components/footer';

const NotFoundPage = () => {
  return (
    <Page title='Page Not Found | Minesweeper'>
      <div className='wrapper clearfix'>
        <h1 className='center'>Page Not Found</h1>
        <p>
          This is not the page you are looking for.
          <br />
          Go to the <Link to='/'>game</Link>.
        </p>
        <Footer />
      </div>
      <div className='overlay'>
        <div className='modal'></div>
      </div>
    </Page>
  )
};

export default NotFoundPage;
