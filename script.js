const player = function(name,marker)
{
    return{name ,marker} ;
}

const GameBoard = (function()  {
    const board = new Array(9).fill(null);
    const getboard = () => board;
        


    const fillcell = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark; 
            getboard();
        } else {
            alert("not empty");
        }
    };
    const resetboard = () => {
        
        for(let i = 0 ;  i < board.length  ; ++i)
        {
            board[i] = null  ;
        }
    };
    const play_round = (mark ,index) =>
    {   
        GameBoard.fillcell(index ,mark) ;
    }
    return {
        getboard,
        resetboard,
        fillcell ,
        play_round 
    };
})();

console.log(GameBoard.getboard()) ; 
const player_one = player("yayha" , "x") ; 
GameBoard.play_round(player_one.marker,5) ; 
GameBoard.play_round(player_one.marker,1) ; 
GameBoard.play_round(player_one.marker,4) ; 



console.log(GameBoard.getboard()) ; 



