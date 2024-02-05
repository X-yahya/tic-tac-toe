const GameBoard = (function() {
    const board = new Array(9).fill(null);
    
    const getboard = () => board;
    
    const fillcell = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark;
            return true;
        } else {
            return false;
        }
    };
    
    const resetboard = () => {
        
        for(let i = 0 ;  i < board.length  ; ++i)
        {
            board[i] = null  ;
        }
    };

    return {
        getboard,
        resetboard,
        fillcell
    };
})();


GameBoard.fillcell(5,"x") ;

console.log(GameBoard.getboard()) ;


GameBoard.resetboard() ; 
console.log(GameBoard.getboard()) ; 
