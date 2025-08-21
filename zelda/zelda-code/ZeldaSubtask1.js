// ZeldaSubtask1
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let gameMap;

function preload() {
  imageBackground = loadImage(`images/background1.png`);
}
function setup() {
  createCanvas(483, 313);

  gameMap = new GameMap();
}

function draw() {
  image(imageBackground, 0, 0, 483, 313);

  gameMap.show();

  //  text(mouseX + " " + mouseY, mouseX, mouseY);
}

class GameMap {
  constructor() { }

  show() {
    noFill();
    let x = 0;
    let y = 27;

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        rect(x, y, 37, 37);
        y += 37;
      }
      y = 27;
      x += 37;
    }
  }
}
