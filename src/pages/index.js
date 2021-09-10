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





// < !DOCTYPE html >
//   <html>


//       <script id='modal-start' type='custom/template'>
//         <h2><strong>NEW GAME</strong></h2>
//         <p>Choose a game size and the number of mines you want in your grid, and then enjoy!</p><br />
//         <label>Game Size:</label>
//         <select className='gamesize'>
//           <option value='1'>8x8</option>
//           <option value='2'>16x16</option>
//           <option value='4'>32x32</option>
//         </select><br />
//         <label># of Mines:</label>
//         <input type='number' className='minenumber' value='8' /><br />
//         <button className='button modal-close'>Cancel</button>
//         <button className='button modal-continue'>Continue</button>
//       </script>
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
//       <script id='grid-td' type='custom/template'>
//         <td data-row='{{row}}' data-col='{{col}}' className='{{class}}'></td>
//       </script>
//       <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'></script>
//       <script src='js/minesweeper.js'></script>
//     </body>
//   </html>
