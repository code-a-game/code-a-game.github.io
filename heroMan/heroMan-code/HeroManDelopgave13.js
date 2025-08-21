// HeroMan subtask 13
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let gameState;
let heroMan;
let angryMan;

function setup() {
  createCanvas(600, 600);

  gameWonArea = new GameWonArea();

  gameState = "SET-START-VALUES";
}

function draw() {
  background(220);

  switch (gameState) {
    case "SET-START-VALUES":
      setStartValues();
      gameState = "GAME-IN-PROGRESS";
      break;
    case "GAME-IN-PROGRESS":
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

function mouseClicked() {
  if (gameState === "GAME-WON" || gameState === "GAME-LOST") {
    gameState = "SET-START-VALUES";
  }
}

function setStartValues() {
  let heroManMoveSpeed = 1.9;
  let greenManMaxMoveSpeed = 0.9;

  heroMan = new HeroMan(heroManMoveSpeed);
  angryMan = new GreenAngryMan("green", greenManMaxMoveSpeed);
}

function showGameState() {
  gameWonArea.show();
  heroMan.show();
  angryMan.show();
}

function updateGameState() {
  heroMan.move();
  angryMan.update(heroMan);
}

function validateGameState() {
  if (heroMan.intersectsAngryMan(angryMan)) {
    gameState = "GAME-LOST";
    return;
  }
  if (heroMan.isInGameWonArea(gameWonArea)) {
    gameState = "GAME-WON";
  }
}

class HeroMan {
  constructor(moveSpeed) {
    this.x = 50;
    this.y = 50;
    this.radius = 25;
    this.colour = "yellow";
    this.moveSpeed = moveSpeed;
  }

  show() {
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x - this.radius > 0) {
      this.x -= this.moveSpeed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x + this.radius < width) {
      this.x += this.moveSpeed;
    }
    if (keyIsDown(UP_ARROW) && this.y - this.radius > 0) {
      this.y -= this.moveSpeed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y + this.radius < height) {
      this.y += this.moveSpeed;
    }
  }

  intersectsAngryMan(angryMan) {
    return (
      dist(this.x, this.y, angryMan.x, angryMan.y) <
      this.radius + angryMan.radius
    );
  }

  isInGameWonArea(gameWonArea) {
    return (
      this.x > gameWonArea.x &&
      this.y > gameWonArea.y &&
      this.x < gameWonArea.x + gameWonArea.boxWidth &&
      this.y < gameWonArea.y + gameWonArea.boxHeight
    );
  }
}

class GameWonArea {
  constructor() {
    this.boxWidth = 100;
    this.boxHeight = 100;
    this.x = width - this.boxWidth;
    this.y = height - this.boxHeight;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.boxWidth, this.boxHeight);
    fill(0);
    textSize(30);
    text("Goal", this.x + 10, this.y + 40);
  }
}

class GreenAngryMan {
  constructor(colour, maxMoveSpeed) {
    this.x = random(200, width - 100);
    this.y = random(200, height - 100);
    this.colour = colour;
    this.radius = 30;
    this.moveSpeed = random(maxMoveSpeed);
  }

  show() {
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
  }

  update(heroMan) {
    if (this.x < heroMan.x) {
      this.x += this.moveSpeed;
    } else {
      this.x -= this.moveSpeed;
    }
    if (this.y < heroMan.y) {
      this.y += this.moveSpeed;
    } else {
      this.y -= this.moveSpeed;
    }
  }
}