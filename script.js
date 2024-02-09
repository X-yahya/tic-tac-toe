const player = function(name, marker ) {
    const pattern = [];
    // score = score ; 
    const addMove = (index) => {
        pattern.push(index);
    };
    const resetPattern = () => {
        pattern.length = 0;
    };

    return { 
        name, 
        marker,
        // score ,  
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
let game_end = false ; 

function resetgame(x, o) {
    GameBoard.resetBoard();
    cells.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", handleClick);
    });
    x.resetPattern(); 
    o.resetPattern(); 
}


let scorePlayerX = 0; 
let scorePlayerY = 0 ;
function handleClick() {
    if (this.textContent === "" && game_end === false) {
        let index = parseInt(this.id);
        if (xTurn) {
            GameBoard.playRound(x, index);
            this.textContent = x.marker;
        } else {
            GameBoard.playRound(o, index);
            this.textContent = o.marker;
        }
        if (GameBoard.checkWin(x)) {
            alert(`${x.name} (X) Wins !! `);
            scorePlayerX += 1 ; 
            xs.textContent = scorePlayerX ;
            // console.log(x.score) ; 
            game_end = true ; 
        } else if (GameBoard.checkWin(o)) {
            alert(`${o.name} (O) Wins !!`);
            scorePlayerY+=1 ; 
            ys.textContent = scorePlayerY ;
            game_end = true ; 
            

            xTurn = false;
        } else if (GameBoard.checkDraw()) {
            alert("Draw ");
            game_end = true ;
            
        }
        xTurn = !xTurn;
    }
}

const xs = document.getElementById("scorep1") ; 
const ys = document.getElementById("scorep2") ; 
start.addEventListener("click", (event) => {
    event.preventDefault();
    start.textContent="Restart" ; 
    x = player(document.getElementById("p1").value, "x");
    o = player(document.getElementById("p2").value, "O");
    xTurn = xTurn
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
        console.log(game_end);
    });
    if (game_end)
    {
        

        resetgame(x,o) ; 
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick);
        });
        game_end = false; 
    }

}); 
