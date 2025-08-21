// HeroMan subtask 24
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let gameState;
let heroMan;
let angryMen = [];
let numberOfTransparentAngryMen;

function setup() {
  createCanvas(600, 600);

  gameWonArea = new GameWonArea();
  gameState = "START-SCREEN";
}

function draw() {
  background(220);

  switch (gameState) {
    case "START-SCREEN":
      showStartMessage();
      break;
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
      showGameWonMessage();
      break;
    case "GAME-LOST":
      showGameState();
      showGameOverMessage();
      break;
  }
}

function mouseClicked() {
  if (gameState === "START-SCREEN") {
    gameState = "SET-START-VALUES";
  }
  if (gameState === "GAME-WON" || gameState === "GAME-LOST") {
    gameState = "START-SCREEN";
  }
}

function showStartMessage() {
  fill(0);
  rect(50, 100, 460, 270);
  fill(255);
  textSize(20);
  text("Hvordan spiller man:", 65, 130);
  text("Du starter øverst til venstre og skal med ", 65, 155);
  text("piletasterne bevæge dig sikkert hen til mål.", 65, 180);
  text("Men pas på de sure mænd på vejen. Hvis du ", 65, 205);
  text("bliver fanget er spillet slut. Hvis en sur mand ", 65, 230);
  text("er gennemsigtig, så pop'er han når du støder", 65, 255);
  text("ind i ham og dette får du point for. Klik med ", 65, 280);
  text("musen for at starte spillet. Held og lykke. ", 65, 305);
}

function setStartValues() {
  let numberOfAngryMen = 15;
  numberOfTransparentAngryMen = 2;
  let heroManMoveSpeed = 1.9;
  let greenManMaxMoveSpeed = 0.9;
  let redManMaxGrowSpeed = 0.05;

  heroMan = new HeroMan(heroManMoveSpeed);
  angryMen = [];

  for (let i = 0; i < numberOfAngryMen; i++) {
    let randomNumber = random(1);
    if (randomNumber < 0.5) {
      angryMen[i] = new GreenAngryMan("green", greenManMaxMoveSpeed);
    } else {
      angryMen[i] = new RedAngryMan("red", redManMaxGrowSpeed);
    }
  }
}

function showGameState() {
  gameWonArea.show();
  heroMan.show();
  for (let angryMan of angryMen) {
    angryMan.show();
  }
}

function updateGameState() {
  heroMan.move();

  let i = 0;
  for (let angryMan of angryMen) {
    if (i < numberOfTransparentAngryMen) {
      angryMan.turnTransparent();
    }
    angryMan.update(heroMan);
    i++;
  }
}

function validateGameState() {
  for (let i = angryMen.length - 1; i >= 0; i--) {
    if (heroMan.intersectsAngryMan(angryMen[i])) {
      if (angryMen[i].canPop()) {
        angryMen.splice(i, 1);
        heroMan.numberOfAngryMenPopped++;
      } else {
        gameState = "GAME-LOST";
        return;
      }
    }
  }
  if (heroMan.isInGameWonArea(gameWonArea)) {
    gameState = "GAME-WON";
  }
}

function showGameWonMessage() {
  fill(0);
  rect(30, 100, 400, 115);
  fill(0, 255, 0);
  textSize(20);

  let messagetextLine1 = "Tillykke. Du har vundet ";
  let messagetextLine2;

  if (heroMan.numberOfAngryMenPopped === 0) {
    messagetextLine2 = "dog uden at pop'e nogle sure mænd";
  } else if (heroMan.numberOfAngryMenPopped === 1) {
    messagetextLine2 =
      "Du fik pop'et " + heroMan.numberOfAngryMenPopped + " sur mand";
  } else {
    messagetextLine2 =
      "Du fik pop'et " + heroMan.numberOfAngryMenPopped + " sure mænd";
  }
  text(messagetextLine1, 45, 130);
  text(messagetextLine2, 45, 155);
  text("Klik med musen for at starte spillet", 45, 180);
}

function showGameOverMessage() {
  fill(0);
  rect(30, 100, 400, 85);
  fill(255, 0, 0);
  textSize(20);
  text("Game over.", 45, 130);
  text("Klik med musen for at starte spillet", 45, 155);
}

class HeroMan {
  constructor(moveSpeed) {
    this.x = 50;
    this.y = 50;
    this.radius = 25;
    this.colour = "yellow";
    this.moveSpeed = moveSpeed;
    this.numberOfAngryMenPopped = 0;
  }

  show() {
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
    fill(0);
    circle(this.x - 8, this.y - 8, 10);
    circle(this.x + 8, this.y - 8, 10);
    line(this.x - 8, this.y + 8, this.x + 8, this.y + 8);
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

class AngryMan {
  constructor(colour) {
    this.x = random(200, width - 100);
    this.y = random(200, height - 100);
    this.colour = colour;
    this.colourAlpha = 255;
    this.radius = 30;
    this.isTransparent = false;
  }

  show() {
    let colourWidhAlpha = color(this.colour);
    colourWidhAlpha.setAlpha(this.colourAlpha);
    fill(colourWidhAlpha);
    circle(this.x, this.y, this.radius * 2);
    fill(0);
    circle(this.x - 8, this.y - 8, 10);
    circle(this.x + 8, this.y - 8, 10);
    ellipse(this.x, this.y + 10, random(10, 20), random(10, 15));
  }

  turnTransparent() {
    this.isTransparent = true;
    this.colourAlpha = 100;
  }
  canPop() {
    return this.isTransparent;
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

class RedAngryMan extends AngryMan {
  constructor(colour, maxGrowSpeed) {
    super(colour);
    this.growSpeed = random(maxGrowSpeed);
  }

  update(heroMan) {
    this.radius = this.radius + this.growSpeed;
  }
}

class GreenAngryMan extends AngryMan {
  constructor(colour, maxMoveSpeed) {
    super(colour);
    this.moveSpeed = random(maxMoveSpeed);
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