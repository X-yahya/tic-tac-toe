const player = function(name, marker) {
    return { name, marker, pattern: [] };
}
const play = function(player , GameBoard)
{

    

}
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
        if (player.pattern) {
            player.pattern.push(index);
        }
    };

    const checkWin = (player) => {
        const winsConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // row
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // col
            [0, 4, 8], [2, 4, 6]             // diag
        ];
        for (const condition of winsConditions) {
            if (condition.every(index => player.pattern.includes(index))) {
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
const playerO = player("playerOName", "O") ; 

console.log(playerX.marker);
console.log(playerO.marker) ; 
console.log(GameBoard.getboard());

