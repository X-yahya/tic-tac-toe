function createUser(name)

{
    const discordName = "@ "+ name  ; 
    let rep = 0 ; 
    const getReputation = () => rep ; 
    const giveReputation = () => rep++ ; 

    return {name , discordName , getReputation , giveReputation} ; 
}


const userx = createUser("x") ; 

userx.giveReputation() ; 

console.log({
    discordName : userx.discordName ,
    reputation : userx.getReputation()
})