// GrandPrixSubtask4 
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let cars = [];

let gameState;
let gameAction;
let gameStepTimer;
let rowCounter;
let heroLanePosition;
let heroRacePosition;
let highScore = 100;
let numberOfCarsToOvertake;
let timeUpLimit;

function setup() {
  createCanvas(600, 444);

  initializeGameState();
}

function initializeGameState() {
  setInitialValues();
  setImageObjectPositions();
  generateCarStream();

  gameState = "GAME-IN-PROGRESS";
}

function draw() {
  switch (gameState) {
    case "GAME-IN-PROGRESS":
      handeGameAction();
      showGameState();
      updateGameState();
      validateGameState();
      break;
    case "GAME-WON":
      showGameState();
      break;
    case "GAME-LOST":
      showGameState();
      break;
  }
}

function keyPressed() {
  if (gameState == "GAME-IN-PROGRESS") {
    if (keyCode === LEFT_ARROW) {
      gameAction = "MOVE-LEFT";
    } else if (keyCode === RIGHT_ARROW) {
      gameAction = "MOVE-RIGHT";
    }
  }
}

function handeGameAction() {
  switch (gameAction) {
    case "MOVE-LEFT":
      moveLeft();
      gameAction = "";
      break;
    case "MOVE-RIGHT":
      moveRight();
      gameAction = "";
      break;
    default:
      break;
  }
}

function moveLeft() {
  if (heroLanePosition > 0) {
    heroLanePosition--;
  }
}

function moveRight() {
  if (heroLanePosition < 2) {
    heroLanePosition++;
  }
}

function setInitialValues() {
  textSize(32);
  fill(0);
  gameAction = "";
  numberOfCarsToOvertake = 100;
  heroRacePosition = numberOfCarsToOvertake + 1;
  timeUpLimit = 50;
  rowCounter = 1;
  heroLanePosition = 1;
  gameStepTimer = new CoolDownTimer();
  gameStepTimer.setCoolDownInterval(900);
  gameStepTimer.startCoolDownTimer();
}

function generateCarStream() {
  let numberOfCars;
  for (let row = 1; row < 106; row++) {
    cars[row] = [];
    numberOfCars = 0;
    for (let column = 0; column < 3; column++) {
      if (
        random(1) < 0.5 &&
        numberOfCars < 2 &&
        row > 5 &&
        numberOfCarsToOvertake > 0
      ) {
        cars[row][column] = "CAR";
        numberOfCarsToOvertake--;
        numberOfCars++;
      } else {
        cars[row][column] = "EMPTY";
      }
    }
    cars[row][3] = numberOfCarsToOvertake;
  }
}

function showGameState() {
  displayBackground();

  showCars();
  showGameStatus();
}

function showCars() {
  for (let row = 1; row < 6; row++) {
    for (let column = 0; column < 3; column++) {
      if (cars[rowCounter + row][column] == "CAR") {
        displayCar(row, column);
      }
    }
  }
  if (heroLanePosition >= 0 && heroLanePosition <= 2) {
    displayCar(0, heroLanePosition);
  }
}

function showGameStatus() {
  if (gameState == "GAME-WON") {
    displayWinnerTrophyAndText();
  } else {
    displayPosition(heroRacePosition);
    if (highScore < 100) {
      displayHighScore(highScore);
    }
    if (gameState == "GAME-LOST") {
      displayGameOver();
    }
  }
}

function updateGameState() {
  if (gameStepTimer.coolDownTimeLeft() > 0) {
    return;
  }

  heroRacePosition = cars[rowCounter + 1][3] + 1;
  rowCounter++;
  gameStepTimer.startCoolDownTimer();
}

function validateGameState() {
  let lifeLost = false;

  if (isHeroDrivingIntoAnotherCar()) {
    lifeLost = true;
    displayCrash(heroLanePosition);
  }

  if (lifeLost) {
    handleGameLost();
  } else if (heroRacePosition == 1) {
    handleGameWon();
  }
}

function handleGameLost() {
  gameState = "GAME-LOST";

  if (heroRacePosition < highScore) {
    highScore = heroRacePosition;
  }
}

function handleGameWon() {
  gameState = "GAME-WON";

  if (heroRacePosition < highScore) {
    highScore = heroRacePosition;
  }
}

function isHeroDrivingIntoAnotherCar() {
  if (heroLanePosition >= 0 && heroLanePosition <= 2) {
    if (
      gameStepTimer.coolDownTimeLeft() < timeUpLimit &&
      cars[rowCounter + 1][heroLanePosition] == "CAR"
    ) {
      return true;
    }
  }
  return false;
}
