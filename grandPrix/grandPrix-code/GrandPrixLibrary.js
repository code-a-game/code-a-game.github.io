// Grand Prix Library
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

function setup() {
  createCanvas(600, 444);

  textSize(32);

  setImageObjectPositions();

  displayPitsLivesAndWinningRace();
  //  displayGameOverAndManWighFlag();
  //  displayPitsFuelPositionAndHighScore()
  //  displayStartImage1()
  //  displayStartImage2()
  //  displayStartImage3()
}

function draw() { }

function displayPitsLivesAndWinningRace() {
  displayBackground();
  showAllCars();
  showAllFences();
  showAllPits();
  showAllLives();
  displayWinnerTrophyAndText("EASY");
}

function displayPitsFuelPositionAndHighScore() {
  displayBackground();
  showAllCars();
  showMostFences();
  showAllPits();
  showAllLives();
  displayCarInPit();
  displayFuelUnitAndCar();
  displayHighScore(100);
  displayPosition(100);
}
function displayGameOverAndManWighFlag() {
  displayBackground();
  showAllCars();
  showMostFences();
  showAllPits();
  showAllLives();
  displayGameOver();
  displayManWithFlag();
}

function showAllCars() {
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 3; column++) {
      displayCar(row, column);
    }
  }
}

function showAllFences() {
  for (let column = 0; column < 5; column++) {
    displayLeftFence(column);
    displayRightFence(column);
  }
}
function showMostFences() {
  for (let column = 0; column < 5; column++) {
    if (column !== 1) {
      displayLeftFence(column);
      displayRightFence(column);
    }
  }
}

function showAllPits() {
  for (let column = 0; column < 4; column++) {
    displayPit(column);
  }
}

function showAllLives() {
  for (let column = 0; column < 3; column++) {
    displayLife(column);
  }
}
