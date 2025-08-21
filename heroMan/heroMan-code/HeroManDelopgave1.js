// HeroMan subtask 1
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
}

function setStartValues() {
  heroMan = new HeroMan();
}

function showGameState() {
  heroMan.show();
}

class HeroMan {
  constructor() {
    this.x = 50;
    this.y = 50;
  }

  show() {
    point(this.x, this.y);
  }
}
