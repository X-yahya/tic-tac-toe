const calculator = (function() 
{
    const add = (a,b) =>a+b ; 
    const subs = (a,b) =>a-b ; 
    const mult = (a,b) =>a*b; 
    const div = (a,b) =>a/b ;
    return{add, subs , mult , div} ; 
})() ; 


console.log(calculator.div(7,5) );
console.log(calculator.add(5,4)) ; 