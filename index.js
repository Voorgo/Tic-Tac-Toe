let origBoard;
const humPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cells = document.querySelectorAll('.cell')
//When replay button is clicked, do this
startGame();
function startGame() {
    document.querySelector('.endgame').style.display = 'none';
    //Create arr from 0 to 9
    origBoard = [...Array(9).keys()]
    for(let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background')
        cells[i].addEventListener('click',turnClick)
    }
}

function turnClick(event) {
    if(typeof origBoard[event.target.id] == 'number') {
        turn(event.target.id, humPlayer)
        if(!checkWin(origBoard, humPlayer) && !checkTie()) {
            setTimeout(function() {
            turn(bestSpot(), aiPlayer)
           }, 200)
    }
    
}
}

function turn(eId, player) {
    origBoard[eId] = player;
    document.getElementById(eId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if(gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
      let plays = board.reduce((a, e, i) => {
          return (e === player) ? a.concat(i) : a
      },[])
      let gameWon = null;
      for(let [index, win] of winCombos.entries()) {
          if(win.every(elem => plays.indexOf(elem) > -1)) {
              gameWon = {index: index, player: player};
              break;
              
              
          }
      }
      return gameWon;
}

function gameOver(gameWon) {
        for (let index of winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor = 
            gameWon.player == humPlayer ? 'blue' : 'red';
        }
        for(let i = 0; i <cells.length; i++) {
            cells[i].removeEventListener('click',turnClick)
        }
        declareWinner(gameWon.player == humPlayer ? 'You win!' : 'You lose!')
}
function declareWinner(who) {
    document.querySelector(".text").innerText = who;
    document.querySelector('.endgame').style.display = 'block';
    
}

function emptySquare() {
    return origBoard.filter(s => typeof s == 'number')
}

function bestSpot() {
    let rand =  Math.floor(Math.random() * emptySquare().length);
    return emptySquare()[rand]
}

function checkTie() {
    if(emptySquare().length == 0) {
        for(let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'green'
            cells[i].removeEventListener('click',turnClick)
        }
        declareWinner('Tie')
        return true
    }
    return false
}