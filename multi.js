let boxes = document.querySelectorAll(".box");
let turn = "X";
let state = ["", "", "", "", "", "", "", "", ""];
let newbtn=document.getElementById("new");
let rstbtn=document.getElementById("reset");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach((box, index) => {
  box.addEventListener("click", function() {
    if (state[index] === "") {
      box.textContent = turn;
      box.disabled = true;
      state[index] = turn;

      let winner = checkWinner(state);
      if (winner) {
        console.log(`Winner is ${winner}`);
        result.style.display = 'block';
        result.textContent = `The winner is ${winner}`;
        disableAllBoxes();
      } else if (isBoardFull()) {
        result.style.display = 'block';
        console.log("The game is a draw");
        result.textContent = "The game is a draw";
      } else {
        turn = (turn === "X") ? "O" : "X";
      }
    }
  });
});
newbtn.addEventListener("click",function(){
    resetGame();
})
rstbtn.addEventListener("click",function(){
    resetGame();
})
function disableAllBoxes() {
  for (let box of boxes) {
    box.disabled = true;
  }
}

function isBoardFull() {
  for (let box of boxes) {
    if (box.textContent === "") {
      return false;
    }
  }
  return true;
}

function checkWinner(state) {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (state[a] !== "" && state[a] === state[b] && state[b] === state[c]) {
      return state[a];
    }
  }
  return false;
}

function resetGame() {
  for (let box of boxes) {
    box.textContent = "";
    box.disabled = false;
  }
  result.style.display = 'none';
  state = ["", "", "", "", "", "", "", "", ""];
}
