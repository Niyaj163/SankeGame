let snakeArr = [{ x: 10, y: 10 }];
let food = { x: 6, y: 7 };
let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 20; // Consider starting with a lower speed for debugging
let score = 0;
let hiscore = localStorage.getItem("hiscore");
let hiscoreval = hiscore === null ? 0 : JSON.parse(hiscore);
document.getElementById("hiScore").innerHTML = "Highest Score: " + hiscoreval;

// Get reference to the board element
const board = document.getElementById("board");

// Main function to control the game loop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

// Function to check for collisions
function collaspe(arr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (arr[0].x === arr[i].x && arr[0].y === arr[i].y) {
      return true;
    }
  }
  if (arr[0].x <= 0 || arr[0].x > 18 || arr[0].y <= 0 || arr[0].y > 18) {
    return true;
  }
  return false;
}

// Game engine to update and render the game state
function gameEngine() {
  if (collaspe(snakeArr)) {
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    inputDir = { x: 0, y: 0 };
    alert("Game Over");
    snakeArr = [{ x: 10, y: 10 }];
    food = { x: 6, y: 7 }; // Reset food position
    return;
  }
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); // Store new high score
      document.getElementById("hiScore").innerHTML =
        "Highest Score: " + hiscoreval; // Update display
    }
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 1;
    let b = 18;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Clear the board
  board.innerHTML = "";
  // Render the snake
  snakeArr.forEach((e, i) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (i === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Render the food
  const foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  // Move the snake

  // Check for collisions

  // Check if the snake has eaten the food
}

// Initialize the game
window.requestAnimationFrame(main);

// Event listener for keydown to change the direction
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (inputDir.y === 0) {
        // Prevent reversing direction
        inputDir.x = 0;
        inputDir.y = -1;
      }
      break;
    case "w":
      if (inputDir.y === 0) {
        // Prevent reversing direction
        inputDir.x = 0;
        inputDir.y = -1;
      }
      break;
    case "ArrowDown":
      if (inputDir.y === 0) {
        inputDir.x = 0;
        inputDir.y = 1;
      }
      break;
    case "s":
      if (inputDir.y === 0) {
        inputDir.x = 0;
        inputDir.y = 1;
      }
      break;
    case "ArrowLeft":
      if (inputDir.x === 0) {
        inputDir.x = -1;
        inputDir.y = 0;
      }
      break;
    case "a":
      if (inputDir.x === 0) {
        inputDir.x = -1;
        inputDir.y = 0;
      }
      break;

    case "ArrowRight":
      if (inputDir.x === 0) {
        inputDir.x = 1;
        inputDir.y = 0;
      }
      break;
    case "d":
      if (inputDir.x === 0) {
        inputDir.x = 1;
        inputDir.y = 0;
      }
      break;
    default:
      break;
  }
});
