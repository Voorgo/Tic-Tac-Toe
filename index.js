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
let replay = document.querySelector("#replay")
replay.addEventListener('click', startGame)
let hardcore = document.querySelector('#hardcore')
hardcore.addEventListener('click', hardcoreFunc)
startGame();
function startGame() {
    document.querySelector('html').style.mixBlendMode = 'normal'
    document.querySelector('.endgame').style.display = 'none';
    origBoard = [...Array(9).keys()]
    for(let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background')
        cells[i].removeEventListener('click', turnClick2)
        cells[i].addEventListener('click',turnClick)
    }
}

function turnClick(event) {
    if(typeof origBoard[event.target.id] == 'number') {
        turn(event.target.id, humPlayer)
        if(!checkWin(origBoard, humPlayer) && !checkTie()) {
            setTimeout(function() {
            turn(bestSpot(), aiPlayer)
           }, 50)
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
            cells[i].removeEventListener('click',turnClick2)
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
    // return minmax(origBoard, aiPlayer).index;
}

function checkTie() {
    if(emptySquare().length == 0) {
        for(let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'green'
            cells[i].removeEventListener('click',turnClick)
            cells[i].removeEventListener('click',turnClick2)
        }
        declareWinner('Tie')
        return true
    }
    return false
}

function minimax(newBoard, player) {
    let availSpots = emptySquare()

    if(checkWin(newBoard,  humPlayer)) {
        return {score: -10}
    }
    else if(checkWin(newBoard, aiPlayer)) {
        return {score: 10};
    }
    else if(availSpots.length === 0) {
        return {score: 0};
    }

    const moves = [];
    for(let i = 0; i < availSpots.length; i++) {
        const move = {}
        move.index = availSpots[i];
        newBoard[availSpots[i]]  = player;

        if(player == aiPlayer) {
            const result = minimax(newBoard, humPlayer)
            move.score = result.score;
        }
        else {
            const result = minimax(newBoard, aiPlayer);
             move.score = result.score; 
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }
    let bestMove;
    if(player == aiPlayer) {
        let bestScore = -1000;
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        let bestScore = 1000;
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove]
}

function hardcoreFunc() {
    document.querySelector('.endgame').style.display = 'none';
    origBoard = [...Array(9).keys()];
    document.querySelector('html').style.mixBlendMode = 'difference'
    for(let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background')
        cells[i].addEventListener('click',turnClick2)
    }
}

function turnClick2(event) {
    if(typeof origBoard[event.target.id] == 'number') {
        turn(event.target.id, humPlayer)
        if(!checkWin(origBoard, humPlayer) && !checkTie()) {
            setTimeout(function() {
            turn(bestSpot2(), aiPlayer)
           }, 50)
    }
}

    function bestSpot2() {
    return minimax(origBoard, aiPlayer).index;
}
}   