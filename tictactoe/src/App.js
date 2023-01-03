import './App.css';

import { useState } from 'react';

function App() {

  const winningPositions = [
    ['1,1', '1,2', '1,3'],
    ['2,1', '2,2', '2,3'],
    ['3,1', '3,2', '3,3'],
    ['1,1', '2,1', '3,1'],
    ['1,2', '2,2', '3,2'],
    ['1,3', '2,3', '3,3'],
    ['1,1', '2,2', '3,3'],
    ['1,3', '2,2', '3,1']
  ]
  var playerXCells = []
  var playerOCells = [];
  playerXCells.push("test");

  const [player, setPlayer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [moves, setMoves] = useState(0);


  const onCellClick = (event) => {
    console.log(event.target.id);
    var thisCell = document.getElementById(event.target.id);
    thisCell.style.pointerEvents = "none";
    thisCell.removeAttribute("onClick");

    if (player === 0) {
      thisCell.innerHTML = "X";
      playerXCells.push(event.target.id);
      if (checkWinningPositions(playerXCells)) {
        setIsGameOver(!setIsGameOver);
      }
    }
    else {
      thisCell.innerHTML = "O";
      playerOCells.push(event.target.id);
      if (checkWinningPositions(playerXCells)) {
        setIsGameOver(!setIsGameOver);
      }
    }
    setMoves(moves + 1);
    if (moves === 9 || isGameOver) {
      document.getElementById('gameOverBanner').innerHTML = "GameOver";
    } else {
      switchPlayer();

    };
  }

  const switchPlayer = () => {
    if (player === 0) {
      setPlayer(1);
    }
    else {
      setPlayer(0);
    }
  }

  const checkWinningPositions = (currentPlayerMoves) => {
    winningPositions.forEach(trio => {
      if (trio.every(val => currentPlayerMoves.includes(val))) return true;
    });
    return false;
  }

  return (
    <div className="App">

      <table>
        <tbody>
          <tr>
            <td id="1,1" onClick={onCellClick}> </td>
            <td id="1,2" onClick={onCellClick}> </td>
            <td id="1,3" onClick={onCellClick}> </td>
          </tr>
          <tr>
            <td id="2,1" onClick={onCellClick}> </td>
            <td id="2,2" onClick={onCellClick}> </td>
            <td id="2,3" onClick={onCellClick}> </td>
          </tr>
          <tr>
            <td id="3,1" onClick={onCellClick}> </td>
            <td id="3,2" onClick={onCellClick}> </td>
            <td id="3,3" onClick={onCellClick}> </td>
          </tr>
        </tbody>
      </table>

      <h1 id='gameOverBanner'></h1>
    </div>
  );
}

export default App;
