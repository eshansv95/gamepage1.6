
let boxes=document.querySelectorAll(".box");
let turn="X";
let state=["","","","","","","","",""];
let result=document.getElementById("result");
let reset=document.getElementById("reset");
let newgame=document.getElementById("new");
let easy=document.getElementById("easy");

//main function
boxes.forEach((box,index)=>{
    box.addEventListener("click",function(){
        
        box.textContent=turn;
        box.disabled=true;
        state[index]=turn;
        if(turn==="X"){
            turn="O";
            
        }
        else{
            turn="X";
            
        } 
        let winner=checkWinner(state);
        if(winner){
            console.log(`winner is${winner}`);
            result.style.display='block';
            result.textContent=` the winner is ${winner}`;
            for(let box of boxes){
                box.disabled=true;
            }
        }
        else if(isBoardFull()){
            console.log("the game is a draw");
            result.textContent="game is a draw";
           
        }
        else {
            computermoveE();
            turn="X";
        }
    });
});
function checkWinner(state){
    let winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(condition of winConditions){
        const [a,b,c]=condition;
        if(state[a] !== "" && state[a] === state[b] && state[b] === state[c])
        {
            return (state[a]);
        }
    }
       return false;
}
function isBoardFull(){
    for(let box of boxes){
        if(box.textContent===""){
        return false;
        }    
    }
    return true;
}
function resetgame(){
    for(let box of boxes){
        box.textContent="";
        box.disabled=false;
        result.style.display='none';
        turn="X";
        emptycells=[];
        state=["","","","","","","","",""];
    }
}
function disableAllBoxes(){
    for(let box of boxes){
        box.disabled=true;
    }
}
//easy mode 
function computermoveE(){
    let emptycells=[];
    for( let i=0;i<state.length;i++){
        if(state[i]===""){
            emptycells.push(i);
        }
    }
    if(emptycells.length===0){
        return;
    }
    let randomindex;
    do{
        randomindex=Math.floor(Math.random()*9);
    }
     while(!emptycells.includes(randomindex));
     let computerindex=randomindex;
     state[computerindex]="O";
     boxes[computerindex].textContent="O";
     boxes[computerindex].disabled=true;
     let winner = checkWinner(state);
     if (winner) {
         console.log(`Winner is ${winner}`);
         disableAllBoxes();
         result.style.display='block';
         result.textContent="winner is O";
     } else if (isBoardFull()) {
         console.log("The game is a draw");
     }
}
reset.addEventListener("click",function(){
    resetgame();
})
newgame.addEventListener("click",function(){
    resetgame();
})