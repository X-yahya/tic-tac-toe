function createUser(name)

{
    const discordName = "@ "+ name  ; 
    let rep = 0 ; 
    const getReputation = () => rep ; 
    const giveReputation = () => rep++ ; 

    return {name , discordName , getReputation , giveReputation} ; 
}


function createPlayer(name, level)
{
    const {getReputation , giveReputation} = createUser(name) ;
    const increaseLevel=()=> ++level ; 
    return{name,getReputation,giveReputation , increaseLevel}
}
player = createPlayer("yahya",5);

player.giveReputation() ; 
console.log(player.getReputation() ); 
console.log(player.increaseLevel()) ; 
console.log(player.increaseLevel()) ; 
console.log(player.increaseLevel()) ; 
