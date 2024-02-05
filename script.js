const player = (function()
{
    const info = function(name , marker)
    {
        this.name = name ; 
        this.marker = marker ; 
    }
})

const GameBoard = (function() {
    const board = new Array(9).fill(null);
    const getboard = () => board;
    
    const fillcell = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark; 
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



