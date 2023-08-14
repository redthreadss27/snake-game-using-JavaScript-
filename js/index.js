//game constants and variables
let inputDir = { x: 0, y: 0 };
// const foodsound = new Audio('')  //when snake eats the food
// const gameOverSound = new Audio('') //sound comes when game is over
// const moveSound = new Audio('')  //sound comes when snake take turns
// const musicSound = new Audio('') //music is played when the game starts
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 3, y: 15 }]
let food = { x: 13, y: 15 };
let score = 0;
let hiscoreval;

//game Functinos
function main(ctime) {
    window.requestAnimationFrame(main); // instead of the setInterval() method we will use the window.requestAnimationFrame() function because
    // requestAnimationFrame produces higher quality animation completely eliminating flicker and shear that can happen when using setTimeout or setInterval, and reduce or completely remove frame skips.
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        //it will render the game when the condition is false
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
    if (snake[0].x >= 22 || snake[0].x <= 0 || snake[0].y >= 22 || snake[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    //part1:updating the snake array and food
    if (isCollide(snakeArr)) {
        // gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over, Press any key to play again.")
        snakeArr = [{ x: 3, y: 15 }]
        // musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    //if you have eaten the food, increment the score and regenerate the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }) // adds the specified elements to the beginning of an array and returns the new length of the array.
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            HighScoreBox.innerHTML = "High Score: " + hiscoreval;
        }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i]
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y


    //part 2:render or display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {//e is event object
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

// main logic starts here
let hiscore = localStorage.getItem("hiscore");

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {  //addEventListener(event, arrow function)
    inputDir = { x: 0, y: 1 } //start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    HighScoreBox.innerHTML = "High Score: " + hiscore;
}