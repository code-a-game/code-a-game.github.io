// ZeldaSubtask5
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let hero;
let boss1;
let boss2;
let gameMap;
let counter = 0;

function preload() {
  imageBackground = loadImage(`images/background1.png`);
  imageHero = loadImage(`images/zelda.png`);
  imageBoss1 = loadImage(`images/boss1.png`);
  imageBoss2 = loadImage(`images/boss2.png`);
  imageStone = loadImage(`images/stone.png`);
}
function setup() {
  createCanvas(483, 313);

  gameMap = new GameMap();
  hero = new Hero();
  boss1 = new Boss(imageBoss1);
  boss2 = new Boss(imageBoss2);
}

function draw() {
  image(imageBackground, 0, 0, 483, 313);

  if (hero.life > 0) {
    counter++;
    if (counter % 10 == 0) {
      boss1.move();
      boss2.move();
      evaluateGameState();
    }
  }
  gameMap.show();
  boss1.show();
  boss2.show();
  hero.show();
  showGameState();

  //  text(mouseX + " " + mouseY, mouseX, mouseY);
}

function evaluateGameState() {
  if (
    (hero.x == boss1.x && hero.y == boss1.y) ||
    (hero.x == boss2.x && hero.y == boss2.y)
  ) {
    hero.life--;
  }
}

function showGameState() {
  fill("black");
  if (hero.life > 0) {
    textSize(20);
    text("Life: " + hero.life, 310, 20);
  } else {
    textSize(30);
    text("Game Lost", 310, 30);
  }
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

class Boss {
  constructor(img) {
    this.x = 2;
    this.y = 3;
    this.img = img;
  }

  show() {
    image(this.img, 37 * this.x, 27 + 37 * this.y);
  }

  move() {
    let dice = random(6);
    if (dice < 1) {
      if (this.x > 0) {
        if (gameMap.fieldObject[this.x - 1][this.y] === "EMPTY") {
          this.x--;
        }
      }
    } else if (dice < 2) {
      if (this.x < 4) {
        if (gameMap.fieldObject[this.x + 1][this.y] === "EMPTY") {
          this.x++;
        }
      }
    } else if (dice < 3) {
      if (this.y > 0) {
        if (gameMap.fieldObject[this.x][this.y - 1] === "EMPTY") {
          this.y--;
        }
      }
    } else if (dice < 4) {
      if (this.y < 4) {
        if (gameMap.fieldObject[this.x][this.y + 1] === "EMPTY") {
          this.y++;
        }
      }
    }
  }
}

class Hero {
  constructor() {
    this.x = 5;
    this.y = 6;
    this.life = 5;
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
  if (hero.life > 0) {
    if (keyCode === LEFT_ARROW) {
      hero.moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
      hero.moveRight();
    } else if (keyCode === UP_ARROW) {
      hero.moveUp();
    } else if (keyCode === DOWN_ARROW) {
      hero.moveDown();
    }
    evaluateGameState();
  }
}
