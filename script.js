const player = function(name, marker) {
    const pattern = [];

    const addMove = (index) => {
        pattern.push(index);
    };

    return { 
        name, 
        marker, 
        getPattern: () => pattern,
        addMove
    };
};

const GameBoard = (function() {
    const boardSize = 3;
    const board = new Array(boardSize ** 2).fill(null);

    const getboard = () => board;
    
    const fillCell = (index, mark) => {
        if (index < 0 || index >= board.length) {
            throw new Error("Invalid cell index");
        }
        if (board[index] !== null) {
            throw new Error("Cell is not empty");
        }
        board[index] = mark;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; ++i) {
            board[i] = null;
        }
    };

    const playRound = (player, index) => {
        fillCell(index, player.marker);
        player.addMove(index); 
    };

    const checkWin = (player) => {
        const winsConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // row
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // col
            [0, 4, 8], [2, 4, 6]             // diag
        ];
        for (const condition of winsConditions) {
            if (condition.every(index => player.getPattern().includes(index))) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return board.every(cell => cell !== null);
    };

    return {
        getboard,
        resetBoard,
        playRound,
        checkWin,
        checkDraw
    };
})();

const playerX = player("playerXName", "X");
const playerO = player("playerOName", "O");

function randomIndex() {
    let indexs = [];
    let board = GameBoard.getboard();
    for (let i = 0; i < board.length; ++i) {
        if (board[i] === null) {
            indexs.push(i);
        }
    }
    return indexs[Math.floor(Math.random() * indexs.length)];
}

// let current_player = playerX;
// while (!GameBoard.checkWin(current_player) && !GameBoard.checkDraw()) {
//     let get_index = randomIndex();
//     GameBoard.playRound(current_player, get_index);
//     console.log(`Player ${current_player.name} marked cell ${get_index}`);
//     current_player = (current_player === playerX) ? playerO : playerX;
// }

// if (GameBoard.checkWin(playerX)) {
//     console.log("Player X wins!");
// } else if (GameBoard.checkWin(playerO)) {
//     console.log("Player O wins!");
// } else {
//     console.log("It's a draw!");
// }

// console.log("Final board:");
// console.log(GameBoard.getboard());
const cells = document.querySelectorAll(".cell") ; 
const start = document.querySelector("#play") ; 

cells.forEach(cell => {
    cell.addEventListener("click", ()=>{alert(`hello from cell number ${cell.id}`) ;}) ; 
    
});




start.addEventListener("click" ,()=>
{
    const player1input = document.getElementById("p1").value ;
    const player2input = document.getElementById("p2").value ; 
    const x = player(player1input,"x") ; 
    const o = player(player2input,"o");
    console.log(x.name , x.marker , o.name , o.marker);
})