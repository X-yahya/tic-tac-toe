const Formatter = (function(){
    const x = (message) => console.log(`Logger : ${message}`) ; 
    let timerun = 0  ; 

    
    const makeUpperCase = (text) =>
    {

        x("Making UpperCase "); 
        settimer() ; 
        return text.toUpperCase() ; 
    } ; 
    const settimer = () =>
    {
        x("setting times run") ; 
        ++timerun ; 
    }
    return {makeUpperCase , settimer , timerun} ; 
})() ; 



// console.log(Formatter.makeUpperCase("mrigl")) ; 
// console.log(Formatter.settimer()) ; 
console.log(Formatter.timerun) ;

