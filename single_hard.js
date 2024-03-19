let boxes=document.querySelectorAll(".box");
let playerhu="X";
let playerai="O";

let state=["","","","","","","","",""];
let result=document.getElementById("result");
let reset=document.getElementById("reset");
let newgame=document.getElementById("new");
let easy=document.getElementById("easy");
let draw=document.getElementById("draw");

//main function
boxes.forEach((box,index)=>{
    box.addEventListener("click",function(){
        let player="X";
        box.textContent=player;
        box.disabled=true;
        state[index]=player;
        if(player==="X"){
            player="O";
            
        }
        else{
            player="X";
            
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
            result.style.display='block';
            console.log("the game is a draw");
            result.textContent="game is a draw";
            
        }
        else {
           computerMove();
            
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
        
        emptycells=[];
        state=["","","","","","","","",""];
        emptyBoxes=[];
    }
}
function disableAllBoxes(){
    for(let box of boxes){
        box.disabled=true;
    }
}
// Function to find available boxes
function availableBoxes(state) {
    let emptyBoxes = [];
    for (let i = 0; i < state.length; i++) {
        if (state[i] === "") {
            emptyBoxes.push(i);
        }
    }
    return emptyBoxes;
}

//easy mode 

function minimax(state, player) {
    let availableSpots = availableBoxes(state);

    // Base Case: Check if the game is over
    if (checkWinner(state)) {
        if (checkWinner(state) === 'X') {
            return { score: -10 };
        } else if (checkWinner(state) === 'O') {
            return { score: 10 };
        } else {
            return { score: 0 };
        }
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];

    // Generate all possible moves
    for (let i = 0; i < availableSpots.length; i++) {
        let move = {};
        let index = availableSpots[i];
        move.index = index;
        state[index] = player;

        // Alternate between players
        let result;
        if (player === 'X') {
            result = minimax(state, 'O');
            move.score = result.score;
        } else {
            result = minimax(state, 'X');
            move.score = result.score;
        }

        // Reset the spot
        state[index] = "";

        // Save the move
        moves.push(move);
    }

    // Choose the best move
    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i]; // Update bestMove to the move object
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i]; // Update bestMove to the move object
            }
        }
    }

    
    // Return the best move
    return bestMove; // Return the move object
}

function computerMove() {
    let bestMove = minimax(state, 'O');
    if (bestMove && bestMove.index !== undefined) {
        state[bestMove.index] = 'O';
        boxes[bestMove.index].textContent = 'O';
        boxes[bestMove.index].disabled = true;
        
        let winner = checkWinner(state); // Check for winner after AI's move
        if (winner) {
            console.log(`Winner is ${winner}`);
            result.style.display = 'block';
            result.textContent = `The winner is ${winner}`;
            disableAllBoxes();
        } else if (isBoardFull()) {
            console.log("The game is a draw");
            result.style.display = 'block';
            result.textContent = "Game is a draw";
        }
    } else {
        console.error("Invalid move returned by minimax");
    }
}


reset.addEventListener("click",function(){
    resetgame();
})
newgame.addEventListener("click",function(){
    resetgame();
})