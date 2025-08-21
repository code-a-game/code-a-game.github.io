// ZeldaSubtask4
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let hero;
let gameMap;

function preload() {
  imageBackground = loadImage(`images/background1.png`);
  imageHero = loadImage(`images/zelda.png`);
  imageStone = loadImage(`images/stone.png`);
}
function setup() {
  createCanvas(483, 313);

  gameMap = new GameMap();
  hero = new Hero();
}

function draw() {
  image(imageBackground, 0, 0, 483, 313);

  gameMap.show();
  hero.show();

  //  text(mouseX + " " + mouseY, mouseX, mouseY);
}

class GameMap {
  constructor() {
    this.fieldObject = [];
    this.setInitialFieldObjects();
  }

  setInitialFieldObjects() {
    for (let i = 0; i < 7; i++) {
      this.fieldObject[i] = [];
      for (let j = 0; j < 7; j++) {
        this.fieldObject[i][j] = "EMPTY";
      }
    }
    this.fieldObject[1][0] = "WALL";
    this.fieldObject[2][2] = "WALL";
    this.fieldObject[2][3] = "WALL";
    this.fieldObject[2][5] = "WALL";
    this.fieldObject[4][5] = "WALL";
    this.fieldObject[3][6] = "WALL";
    this.fieldObject[6][0] = "WALL";
    this.fieldObject[6][6] = "WALL";
  }

  show() {
    let x = 0;
    let y = 27;

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        this.setFieldObject(i, j);
        //        rect(x, y, 37, 37);
        y += 37;
      }
      y = 27;
      x += 37;
    }
  }

  setFieldObject(i, j) {
    noFill();
    if (this.fieldObject[i][j] === "WALL") {
      image(imageStone, 37 * i, 27 + 37 * j);
    }
  }
}

class Hero {
  constructor() {
    this.x = 5;
    this.y = 6;
  }

  moveLeft() {
    if (this.x > 0 && gameMap.fieldObject[this.x - 1][this.y] === "EMPTY") {
      this.x--;
    }
  }

  moveRight() {
    if (this.x < 6 && gameMap.fieldObject[this.x + 1][this.y] === "EMPTY") {
      this.x++;
    }
  }

  moveUp() {
    if (this.y > 0 && gameMap.fieldObject[this.x][this.y - 1] === "EMPTY") {
      this.y--;
    }
  }

  moveDown() {
    if (this.y < 6 && gameMap.fieldObject[this.x][this.y + 1] === "EMPTY") {
      this.y++;
    }
  }

  show() {
    image(imageHero, 37 * this.x, 27 + 37 * this.y);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    hero.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    hero.moveRight();
  } else if (keyCode === UP_ARROW) {
    hero.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    hero.moveDown();
  }
}
