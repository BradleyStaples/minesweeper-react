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
}

export default IndexPage;






//       <script id='modal-help' type='custom/template'>
//         <h2><strong>HELP</strong></h2>
//         <p><strong>Click</strong> a cell to uncover it. <strong>Shift-click</strong> a cell to flag that cell a holding a mine. <strong>Shift-click</strong> again on
//           a cell with a flag to clear the flag.</p>
//         <p>Uncovered cells that are empty indicate that no adjacent cells have mines. Uncovered cells with numbers inside of them indicate how
//           many adjacement cells have mines. Uncover all cells without uncovering any cells that have mines to win. You can also win by flagging all cells that contain mines.</p>
//         <p>If you think you have only mined cells left (or if you think you have all mined cells flagged), you can validate your result without needing
//           to flag/uncover the remaining cells.</p>
//         <p>You can cheat to reveal which cells have mines.</p>
//         <button className='button modal-close'>Close Help</button>
//       </script>
//       <script id='modal-confirm' type='custom/template'>
//         <h2><strong>Are you sure?</strong></h2>
//         <p>{{ message }}</p>
//         <button className='button modal-close'>Cancel</button>
//         <button className='button modal-continue'>Continue</button>
//       </script>
//       <script id='modal-notice' type='custom/template'>
//         <h2><strong>{{ title }}</strong></h2>
//         <p>{{ message }}</p>
//         <button className='button modal-close'>Close</button>
//       </script>
