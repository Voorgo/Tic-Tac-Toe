/* 1.Human
2.AI
3.winCombos[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
4.startGame() because on first try did not run
5.Declaring startGame() function {
    1.set endgame display to none
    2.create an arr from 0 to 8 and asign its value to origBoard
    3.for each cell of cells {
        remove innerText
        removeProperty('background')
        addevenListener to each cell turnClick
    }
}
6.Declaring turnClick(event) {
     if(typeof origBoard[event.target.id] == 'number') {
        turn(event.target.id, humPlayer)
        if(!checkWin(origBoard, humPlayer) && !checkTie()) turn(bestSpot(), aiPlayer)
}

7.Declaring turn(eId, player) function {
        origBoard[eid] = player; => board at index id is equal with O;
        document.getElementByID(eId).innerText = player(O);
        let gameWon = checkWin(orignBoard, player(humPlayer))
        if(gameWon) { call gameOver(gamWon)}
}

8.Declaring checkWin(board, player) {
    let plays = board.reduce((accumulator, element, index) => {
        return (element === player) ? a.concat(i) : a(if element === O, return index where O is present, else return a)
    }, a = [])
    set gameWon = null;
    for(let [index,win] of winCombos.entries()) {
        (destructuring win arr(.entries return an array with key:value pairs, in this case index and combo arr))
        if(win.every(elem => plays.indexOf(elem) > -1))
        (if every elem of win have an index greater than -1 on plays)
        gamwWon = {index:index, player: player} winCombos index
        break;
    }
    return gameWon
}

9.Declaring gameOver(gameWon) {
    for(let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.bcolor = 
        gameWon.player == humPlayer ? 'blue' : 'red'
    }
    for(let i = o; i< cells.length; i++) {
        cells[i].removeEventListener(click, turnclick)
    }
    declareWInner(gameWon.player == humPlayer ? "You win" : 'You lose')
}

10.Declare declareWInner(who) {
    document.querySelector('.text').innerText = who;
    endgame.display = block
}

11.Declare emptySquare() {
    return origBoard.filter(s => typeof s == 'number')
}

12.Declare bestSpot() {
    let rand = Math.floor(Math.random() * emptysquare().length)
    return emptySquare()[rand]
}

13.Declaring checkTie {
    if(emptySquare().length == 0) {
        for(let i = 0; i < cells.length; i++)
        cells[i].style.backgroundColor = 'green'
        cells[i].removeEventListener('click',turnClick)
    }
    declareWInner('Tie')
    return True
}
return false
}
*/