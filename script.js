const player = function(name, marker) {
    const pattern = [];

    const addMove = (index) => {
        pattern.push(index);
    };
    const resetPattern = () => {
        pattern.length = 0;
    };

    return { 
        name, 
        marker, 
        getPattern: () => pattern,
        addMove , 
        resetPattern
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

const cells = document.querySelectorAll(".cell");
const start = document.querySelector("#play");
let x, o;
let xTurn = true; 

function resetgame(x, o) {
    GameBoard.resetBoard();
    cells.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", handleClick);
    });
    x.resetPattern(); 
    o.resetPattern(); 
}

function handleClick() {
    if (this.textContent === "") {
        let index = parseInt(this.id);
        if (xTurn) {
            GameBoard.playRound(x, index);
            this.textContent = x.marker;
        } else {
            GameBoard.playRound(o, index);
            this.textContent = o.marker;
        }
        if (GameBoard.checkWin(x)) {
            console.log(`${x.name} Wins !! `);
            resetgame(x, o);
            xTurn = true;
        } else if (GameBoard.checkWin(o)) {
            console.log(`${o.name} Wins !!`);
            resetgame(x, o);
            xTurn = false;
        } else if (GameBoard.checkDraw()) {
            console.log("Draw ");
            resetgame(x, o);
        }
        xTurn = !xTurn;
    }
}


start.addEventListener("click", (event) => {
    event.preventDefault();
    start.textContent="Restart game" ; 
    x = player(document.getElementById("p1").value, "x");
    o = player(document.getElementById("p2").value, "O");
    xTurn = xTurn
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
}) ; 
