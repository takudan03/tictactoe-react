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
  ];

  const [playerXCells, setPlayerXCells] = useState([]);
  const [playerOCells, setPlayerOCells] = useState([]);


  const [player, setPlayer] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);
  const [moves, setMoves] = useState(1);

  var onCellClick = (event) => {
    console.log("Cell clicked: ", event.target.id);
    var thisCell = document.getElementById(event.target.id);
    thisCell.style.pointerEvents = "none";
    thisCell.removeAttribute("onClick");

    if (player === "X") {
      thisCell.innerHTML = "X";
      setPlayerXCells(playerXCells => [...playerXCells, event.target.id]);
      if (checkWinningPositions(playerXCells)) {
        setIsGameOver(!isGameOver);
      }
    } else {
      thisCell.innerHTML = "O";
      setPlayerOCells(playerOCells => [...playerOCells, event.target.id]);
      if (checkWinningPositions(playerOCells)) {
        setIsGameOver(!isGameOver);
      }
    }
    setMoves((moves) => moves + 1);
    console.log("X positions: ", playerXCells);
    console.log("O positions: ", playerOCells);
    console.log("Moves: ", moves);
    if (moves === 9 || isGameOver) {
      document.getElementById('gameOverBanner').innerHTML = "GameOver";
    } else {
      switchPlayer();
    };
  }

  const switchPlayer = () => {
    if (player === "X") {
      setPlayer("O");
    }
    else {
      setPlayer("X");
    }
  }


  // check whether the set on which the
  // method is invoked is the subset of
  // otherset or not
  Set.prototype.subSet = function (otherSet) {
    // if size of this set is greater
    // than otherSet then it can't be
    //  a subset
    if (this.size > otherSet.size)
      return false;
    else {
      for (var elem of this) {
        // if any of the element of
        // this is not present in the
        // otherset then return false
        if (!otherSet.has(elem))
          return false;
      }
      return true;
    }
  }

  const checkWinningPositions = (currentPlayerMoves) => {
    winningPositions.forEach(trio => {
      var thisSet = new Set(trio);
      var playerPosSet = new Set(currentPlayerMoves);
      // console.log(thisSet);
      if (thisSet.subSet(playerPosSet)) {
        return true;
      };
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
