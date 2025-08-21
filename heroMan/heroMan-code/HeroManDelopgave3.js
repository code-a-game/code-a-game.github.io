// HeroMan subtask 3
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let gameState;
let heroMan;

function setup() {
  createCanvas(600, 600);

  setStartValues();
}

function draw() {
  background(220);

  showGameState();
  updateGameState();
}

function setStartValues() {
  heroMan = new HeroMan();
}

function showGameState() {
  heroMan.show();
}

function updateGameState() {
  heroMan.move();
}

class HeroMan {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.radius = 25;
    this.colour = "yellow";
    this.moveSpeed = 2;
  }

  show() {
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.moveSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.moveSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.moveSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.moveSpeed;
    }
  }
}
