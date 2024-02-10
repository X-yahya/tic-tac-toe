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
        addMove, 
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

const gameController = (function() {
    let x, o;
    let xTurn = true;
    let gameEnd = false;

    function initializeGame() {
        GameBoard.resetBoard();
        x = player(document.getElementById("p1").value, "X");
        o = player(document.getElementById("p2").value, "O");
        displayScores();
        addCellEventListeners();
        gameEnd = false;
    }

    function resetGame() {
        GameBoard.resetBoard();
        resetPlayers();
        resetCellContent();
        addCellEventListeners();
        gameEnd = false;
    }

    function displayScores() {
        document.getElementById("scorep1").textContent = scorePlayerX;
        document.getElementById("scorep2").textContent = scorePlayerO;
    }

    function resetScores() {
        scorePlayerX = 0;
        scorePlayerO = 0;
        displayScores();
    }

    function resetPlayers() {
        x.resetPattern();
        o.resetPattern();
    }

    function resetCellContent() {
        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    function addCellEventListeners() {
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick);
        });
    }

    function removeCellEventListeners() {
        cells.forEach(cell => {
            cell.removeEventListener("click", handleClick);
        });
    }

    function handleClick() {
        if (this.textContent === "" && !gameEnd) {
            let index = parseInt(this.id);
            let currentPlayer = xTurn ? x : o;
            GameBoard.playRound(currentPlayer, index);
            this.textContent = currentPlayer.marker;
            if (GameBoard.checkWin(currentPlayer)) {
                handleWin(currentPlayer);
            } else if (GameBoard.checkDraw()) {
                handleDraw();
            } else {
                xTurn = !xTurn;
            }
        }
    }

    function handleWin(player) {
        alert(`${player.name} (${player.marker}) Wins!!`);
        if (player === x) {
            scorePlayerX+=1;
        } else {
            scorePlayerO+=1;
        }
        displayScores();
        gameEnd = true;
        removeCellEventListeners();
    }

    function handleDraw() {
        alert("Draw!");
        gameEnd = true;
        removeCellEventListeners();
    }

    return {
        initializeGame,
        resetGame
    };
})();

const cells = document.querySelectorAll(".cell");
const startButton = document.querySelector("#play");
let scorePlayerX = 0;
let scorePlayerO = 0;

startButton.addEventListener("click", (event) => {
    gameController.initializeGame();
    event.preventDefault();
    startButton.textContent = "Restart";
    gameController.resetGame();
});


