import {player , GameBoard} from script.js

const cells = document.querySelectorAll(".cell") ; 
cells.forEach(cell => {
    cell.addEventListener("click", ()=>{alert(`hello from cell number ${cell.id}`) ;}) ; 

});

