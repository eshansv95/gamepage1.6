const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");
let up = document.getElementById("up");
let down = document.getElementById("down");
let left = document.getElementById("left");
let right = document.getElementById("right");
let score = document.getElementById("score");
let gameover = document.getElementById("gameover");
let finalscore = document.getElementById("finalscore");
let newgame = document.getElementById("newgame");
let count = 0;
let snakeX = 30;
let snakeY = 10;
let appleX = 10;
let appleY = 10;
let snakeLength = 5;
let snakeSegments = [];
let intervalId;
let lastDirection = null; 
let currentDirection = null; 
let final=document.getElementById("finalscore2");
let ins=document.getElementById("ins");
let highscore=document.getElementById("highestscore");

canvas.width = 300;
canvas.height = 500;

function drawApple(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 10, 10);
}

function initializeSnake() {
    snakeX = 30;
    snakeY = 10;
    snakeSegments = [];
    for (let i = 0; i < snakeLength; i++) {
        snakeSegments.push({ x: snakeX - i * 10, y: snakeY });
    }
}
function drawSnake() {

    if (!snakeSegments || snakeSegments.length === 0) {
        return; 
    }

    // Draw the head of the snake in blue
    ctx.fillStyle = "#2a9df4";
    ctx.fillRect(snakeSegments[0].x, snakeSegments[0].y, 10, 10);

    // Draw the rest of the snake in white
    ctx.fillStyle = "white";
    for (let i = 1; i < snakeSegments.length; i++) {
        ctx.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple(appleX, appleY);
    drawSnake();
}

function moveSnake(direction) {
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        
        currentDirection = direction;

        // Move the snake's head based on the direction
        if((lastDirection === "up" && direction === "down")){
            stopGame();
        }
        if((lastDirection === "down" && direction === "up")){
            stopGame();
        }
        if((lastDirection === "left" && direction === "right")){
            stopGame();
        }
        if (lastDirection === "right" && direction === "left"){
            stopGame();
        }

        if (direction === "up") {
            snakeY -= 10;
        } else if (direction === "down") {
            snakeY += 10;
        } else if (direction === "left") {
            snakeX -= 10;
        } else if (direction === "right") {
            snakeX += 10;
        }

        snakeSegments.unshift({ x: snakeX, y: snakeY });
        if (snakeSegments.length > snakeLength) {
            snakeSegments.pop();
        }

        lastDirection = direction; 

        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
            stopGame();
            return;
        }
        checkCollision();
        checkSelfCollision(); 
        draw();
    }, 100);
}

function checkSelfCollision() {
    const head = snakeSegments[0];
    for (let i = 1; i < snakeSegments.length; i++) {
        const segment = snakeSegments[i];
        if (head.x === segment.x && head.y === segment.y) {
            finalscore.innerHTML = count;
            finalscore.style.display = "block";
            gameover.style.display = "block";
            stopGame();
            return;
        }
    }
}

function checkCollision() {
    if (snakeX < appleX + 10 &&
        snakeX + 10 > appleX &&
        snakeY < appleY + 10 &&
        snakeY + 10 > appleY) {
        appleX = Math.floor(Math.random() * (canvas.width - 10));
        appleY = Math.floor(Math.random() * (canvas.height - 10));
        snakeLength += 5;
        count += 5;
        score.innerHTML = count;
    }
}

function stopGame() {
    clearInterval(intervalId);
    document.removeEventListener("keydown", handleKeyDown);
    up.removeEventListener("click", handleUpClick);
    down.removeEventListener("click", handleDownClick);
    left.removeEventListener("click", handleLeftClick);
    right.removeEventListener("click", handleRightClick);
    finalscore.innerHTML = count;
    finalscore.style.display = "block";
    gameover.style.display = "block";
    final.style.display="block";
}

function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
        moveSnake("up");
    } else if (event.key === "ArrowDown") {
        moveSnake("down");
    } else if (event.key === "ArrowLeft") {
        moveSnake("left");
    } else if (event.key === "ArrowRight") {
        moveSnake("right");
    }
}

function handleUpClick() {
    moveSnake("up");
}

function handleDownClick() {
    moveSnake("down");
}

function handleLeftClick() {
    moveSnake("left");
}

function handleRightClick() {
    moveSnake("right");
}

document.addEventListener("keydown", handleKeyDown);
up.addEventListener("click", handleUpClick);
down.addEventListener("click", handleDownClick);
left.addEventListener("click", handleLeftClick);
right.addEventListener("click", handleRightClick);

if (window.innerWidth <= 768) {
    // For fone
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let touchStartX, touchStartY;

    document.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    document.addEventListener("touchmove", function (event) {
        event.preventDefault();
        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                moveSnake("right");
            } else {
                moveSnake("left");
            }
        } else {
            if (dy > 0) {
                moveSnake("down");
            } else {
                moveSnake("up");
            }
        }
    });
}

function animate() {
    draw();
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        stopGame();
        return;
    }
    updateHighScore();
    requestAnimationFrame(animate);
}

let highScore = 0;

// Function to update the high score
function updateHighScore() {
    if (count > highScore) {
        highScore = count;

        localStorage.setItem("snakeHighScore", highScore); 
        highscore.innerHTML = highScore; 
    }
}

newgame.addEventListener("click", function () {
    count = 0;
    finalscore.style.display = "none";
    gameover.style.display = "none";
    score.innerHTML = "0";
    clearInterval(intervalId); 

    snakeX = 30;
    snakeY = 10;
    snakeLength = 5;
    snakeSegments = [];

    //apple where come
    appleX = Math.floor(Math.random() * (canvas.width - 10));
    appleY = Math.floor(Math.random() * (canvas.height - 10));

    // start listening
    document.addEventListener("keydown", handleKeyDown);
    up.addEventListener("click", handleUpClick);
    down.addEventListener("click", handleDownClick);
    left.addEventListener("click", handleLeftClick);
    right.addEventListener("click", handleRightClick);
    final.style.display="none";
    highscore.innerHTML = highScore;

    // lets playyyyyy
    animate();
});


initializeSnake();
animate();

