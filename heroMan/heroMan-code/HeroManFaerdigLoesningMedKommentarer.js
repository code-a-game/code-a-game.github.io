// HeroMan Full solution with comments
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

// Spiltilstande: START-SCREEN, SET-START-VALUES, GAME-IN-PROGRESS, GAME-WON, GAME-LOST
let gameState;
// Spil niveau'er: EASY, NORMAL, HARD, EXTREME
let gameLevel;

// Variabler der bruges mens spillet er i gang
let heroMan;
let angryMen = [];
let numberOfTransparentAngryMen;

// Her oprettes de faste objekterne og vi sætter gameState således at "draw" funktionen viser start skærmen.
function setup() {
  createCanvas(600, 600);

  gameWonArea = new GameWonArea();
  buttonEasy = new Button("Easy");
  buttonNormal = new Button("Normal");
  buttonHard = new Button("Hard");
  buttonExtreme = new Button("Extreme");
  buttonRestartGame = new Button("Start spillet igen");
  gameState = "START-SCREEN";
}

// "draw" funktionen skal bare håndtere de forskellige tilstande spillet kan være i (representeret ved gameState variablen)
function draw() {
  background(220);

  switch (gameState) {
    case "START-SCREEN":
      showStartMessage();
      break;
    // Sætter start værdier og starter spillet.
    case "SET-START-VALUES":
      setStartValues();
      gameState = "GAME-IN-PROGRESS";
      break;
    case "GAME-IN-PROGRESS":
      // Det er smart at adskille funktionaliteten i funktioner der gør en ting. Dette gør at de er nemmere at læse, forstå og genbruge. Når spillet er i gang kaldes disse tre funktioner 60 gange pr sekund.
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

// Knapperne holder selv styr på om der bliver klikket på dem. Det giver noget meget renere kode at få funktionaliteten ind i objekter. Det er tit en fordel at gøre så mange funktioner som muligt dumme som denne, således at man kan fokusere sin opmærksomhed på de steder i programmet hvor programlogikken er. Her sættes udelukkende gameState og gameLevel hvorefter styringen sker i "draw" funktionen.
function mouseClicked() {
  if (gameState === "START-SCREEN") {
    if (buttonEasy.isClicked()) {
      gameState = "SET-START-VALUES";
      gameLevel = "EASY";
    }
    if (buttonNormal.isClicked()) {
      gameState = "SET-START-VALUES";
      gameLevel = "NORMAL";
    }
    if (buttonHard.isClicked()) {
      gameState = "SET-START-VALUES";
      gameLevel = "HARD";
    }
    if (buttonExtreme.isClicked()) {
      gameState = "SET-START-VALUES";
      gameLevel = "EXTREME";
    }
  }
  if (gameState === "GAME-WON" || gameState === "GAME-LOST") {
    if (buttonRestartGame.isClicked()) {
      gameState = "START-SCREEN";
    }
  }
}

// Det er også nemt at gennemskue denne funktion. Det er f.eks. nemt at sætte knappernes position og vise dem, da de selv har ansvar for dette.
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
  text("ind i ham og dette får du point for. Held og ", 65, 280);
  text("lykke. ", 65, 305);

  buttonEasy.update(65, 320, 70, 30);
  buttonEasy.show();
  buttonNormal.update(150, 320, 90, 30);
  buttonNormal.show();
  buttonHard.update(255, 320, 70, 30);
  buttonHard.show();
  buttonExtreme.update(340, 320, 100, 30);
  buttonExtreme.show();
}

// Det er smart at samle håndteringen af start værdier således at det er nemt at tilrette disse.
function setStartValues() {
  let heroManMoveSpeed;
  let numberOfAngryMen;
  let blueManMaxMoveSpeed;
  let greenManMaxFollowSpeed;
  let redManMaxGrowSpeed;

  switch (gameLevel) {
    case "EASY":
      numberOfAngryMen = 15;
      numberOfTransparentAngryMen = 2; // Global variabel
      heroManMoveSpeed = 1.9;
      blueManMaxMoveSpeed = 1.5;
      greenManMaxMoveSpeed = 0.9;
      redManMaxGrowSpeed = 0.05;
      break;
    case "NORMAL":
      numberOfAngryMen = 19;
      numberOfTransparentAngryMen = 3;
      heroManMoveSpeed = 2.5;
      blueManMaxMoveSpeed = 2;
      greenManMaxMoveSpeed = 1.1;
      redManMaxGrowSpeed = 0.08;
      break;
    case "HARD":
      numberOfAngryMen = 23;
      numberOfTransparentAngryMen = 4;
      heroManMoveSpeed = 3.5;
      blueManMaxMoveSpeed = 2.2;
      greenManMaxMoveSpeed = 1.3;
      redManMaxGrowSpeed = 0.1;
      break;
    case "EXTREME":
      numberOfAngryMen = 30;
      numberOfTransparentAngryMen = 9;
      heroManMoveSpeed = 5;
      blueManMaxMoveSpeed = 3;
      greenManMaxMoveSpeed = 2;
      redManMaxGrowSpeed = 0.2;
      break;
  }

  heroMan = new HeroMan(heroManMoveSpeed);
  angryMen = [];

  // De tre typer sure mænd er lidt forskellige, men JavaScript kan godt finde ud af at håndtere dem på samme måde, da de nedarver fra den samme klasse og alle har en "show" og "update" metode. Det er nemmere at forstå og overskue koden når man kun håndterer et array i stedet for tre array's.
  for (let i = 0; i < numberOfAngryMen; i++) {
    let randomNumber = random(1);
    if (randomNumber < 0.5) {
      angryMen[i] = new BlueAngryMan("blue", blueManMaxMoveSpeed);
    } else if (randomNumber < 0.7) {
      angryMen[i] = new GreenAngryMan("green", greenManMaxMoveSpeed);
    } else {
      angryMen[i] = new RedAngryMan("red", redManMaxGrowSpeed);
    }
  }
}

// Koden er nem at gennemskue når man bare kalder objekternes metoder for at vise dem. Det er smart at vi bare kan kalde "show" metoden for hver sur mand i arrayet selv om de vises lidt forskellig.
function showGameState() {
  gameWonArea.show();
  heroMan.show();
  for (let angryMan of angryMen) {
    angryMan.show();
  }
}

// Vi sørger for at der altid er nogle transparente sure mænd (hvor antallet jo er afhængig af gameLevel).
function updateGameState() {
  heroMan.move();

  let i = 0;
  for (let angryMan of angryMen) {
    if (i < numberOfTransparentAngryMen) {
      angryMan.turnTransparent();
    }
    angryMan.update(heroMan);
    // Betyder det samme som "i = i + 1"
    i++;
  }
}

// Første element i et array er på plads nummer 0 og sidste element kan man derfor finde ved at tage antallet af elementer minus 1. Hvis man skal fjerne et element fra arrayet skal man løbe det igennem bagfra således at index på de resterende elementer ikke ændres sig (fordi et element fjernes). Program logikken er nem at gennemskue da vi har uddeligeret så meget funktionalitet som muligt til objekterne. Hvis spillet er vundet eller tabt sætter vi bare gameState og overlader styringen af dialogen med brugeren til "draw" funktionen.
function validateGameState() {
  for (let i = angryMen.length - 1; i >= 0; i--) {
    // Her testes for om heroMan rører en af de sure mænd
    if (heroMan.intersectsAngryMan(angryMen[i])) {
      if (angryMen[i].canPop()) {
        // Her fjernes et element fra arrayet
        angryMen.splice(i, 1);
        heroMan.numberOfAngryMenPopped++;
      } else {
        heroMan.turnGrey();
        angryMen[i].turnGrey();
        gameState = "GAME-LOST";
        return;
      }
    }
  }
  if (heroMan.isInGameWonArea(gameWonArea)) {
    gameState = "GAME-WON";
  }
}

// Selv om denne funktion har en del tekst der tilpasses afhændig af forskellige parametre er koden nogenlunde til at gennemskue fordi en del af kompleksiteten er flyttet ned i knapperne.
function showGameWonMessage() {

  fill(0);
  rect(30, 100, 400, 115);
  fill(0, 255, 0);
  textSize(20);

  let messagetextLine1 = "Tillykke. Du har vundet på level ";
  let messagetextLine2;
  if (buttonEasy.getWasClicked()) {
    // Betyder det samme som 'messagetextLine1 = messagetextLine1 + "Easy"''
    messagetextLine1 += "Easy";
  } else if (buttonNormal.getWasClicked()) {
    messagetextLine1 += "Normal";
  } else if (buttonHard.getWasClicked()) {
    messagetextLine1 += "Hard";
  } else if (buttonExtreme.getWasClicked()) {
    messagetextLine1 += "Extreme";
  }

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

  buttonRestartGame.update(45, 170, 145, 30);
  buttonRestartGame.show();
}

function showGameOverMessage() {
  /*
   Dette er en forkortet måde at skrive
   let yCoordinateForMessageBox
   if heroMan.y > 300 {
      yCoordinateForMessageBox = 100
   else {
      yCoordinateForMessageBox = 400
   }
  }
*/
  let yCoordinateForMessageBox = heroMan.y > 300 ? 100 : 400;

  fill(0);
  rect(30, yCoordinateForMessageBox, 400, 85);
  fill(255, 0, 0);
  textSize(20);
  text("Game over.", 45, yCoordinateForMessageBox + 30);

  buttonRestartGame.update(45, yCoordinateForMessageBox + 45, 150, 30);
  buttonRestartGame.show();
}

// En klasse er en template/type for objekter. Her defineres hvilke variabler og metoder som objekterne kan gøre brug af. Her ses f.eks. en klasse der hedder HeroMan. Navnet på en klasse skal starte med et stort bogstav. En klasse diffinerer altså hvad det vil sige at være en HeroMan. Et objekt af typen/klassen HeroMan har en pladsering, størrelse, farve, hastighed han kan flytte sig med. Herudover holder objektet selv styr på hvor mange sure mænd han har pop'et. Ud over at kunne flytte sig, så kan han også registrere hvis han rører en sur mand eller hvis han er i målområdet. Han kan også farve sig selv grå og så kan han selvfølgelig også vises.
class HeroMan {
  // En klasse skal have en "constructor" som tager imod 0 eller flere parametre. "this.moveSpeed = moveSpeed" betyder at man gemmer værdien der står i parameteren ved navn moveSpeed i objektets variable ved navn this.moveSpeed. Når en variabel start med "this." betyder det at det er objektets variabel. Disse skal ikke defineres ved brug af "let".
  constructor(moveSpeed) {
    this.x = 50;
    this.y = 50;
    this.radius = 25;
    this.colour = "yellow";
    this.moveSpeed = moveSpeed;
    // Vi lader selv heroMan holde styr på hvor mange sure mænd han har pop'et. Kode er generelt nemmest at læse, forstå, vedligehold, genbruge og teste hvis vi lader objekterne holde data så vi herved også undgår at have globale variabler.
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

  // HeroMan klassen har metoden move(). Når man har oprettet sit objekt, så er det nemt at flytte det ved først at kalde "move" og herefter "show" metoden.
  move() {
    if (keyIsDown(LEFT_ARROW) && this.x - this.radius > 0) {
      // Betyder "this.x = this.x - this.moveSpeed"
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

  // Hvis afstanden mellem midten af heroMan's og en sur mands cirkel er mindre end de to radius'er lagt sammen, så rører de to cirkler ved hinanden. Note: Som vi ved er radius afstanden fra midten af en cirkel og ud til kanten (periferien)
  intersectsAngryMan(angryMan) {
    return (
      dist(this.x, this.y, angryMan.x, angryMan.y) <
      this.radius + angryMan.radius
    );
  }

  // Hvis denne kode er lidt svær at forstå, så tegn en tegning.
  isInGameWonArea(gameWonArea) {
    return (
      this.x > gameWonArea.x &&
      this.y > gameWonArea.y &&
      this.x < gameWonArea.x + gameWonArea.boxWidth &&
      this.y < gameWonArea.y + gameWonArea.boxHeight
    );
  }

  turnGrey() {
    this.colour = "grey";
  }
}

// AngryMan er en klasse som de sure mænd nedarver fra. De sure mænd er karakteriseret ved at de har en pladsering, radius og farve. De kan også blive transparente, pop'e og farve sig selv grå.
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

  turnGrey() {
    this.colour = "grey";
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

// BlueAngryMan klassen nedarver fra AngryMan klassen. Dette skriver man i koden ved at skrive "extends", se nedenfor. Herved har objekter der er af typen/klassen BlueAngryMan både de variabler og metoder der står i BlueAngryMan klassen og dem i AngryMan klassen. Når man i constructoren skriver super(...) så kaldes klassen der nedarves fra's constructor (dvs. AngryMan klassen's constructor). Udover at have de samme variabler og metoder som en AngryMan, så kan en BlueAngryMan bevæge sig som en billard kugle.
class BlueAngryMan extends AngryMan {
  constructor(colour, maxMoveSpeed) {
    super(colour);
    this.moveSpeed = random(maxMoveSpeed);

    if (random(1) < 0.8) {
      this.xDirection = 1;
    } else {
      this.xDirection = -1;
    }
    if (random(1) < 0.8) {
      this.yDirection = 1;
    } else {
      this.yDirection = -1;
    }
  }

  // Da update metoden for GreenAngryMan klassen har "heroMan" som argument, så er vi også nød til at have dette objekt som argument her. Herved kan vi opnå at de tre typer sure mænd håndteres.
  update(heroMan) {
    // Hvis den rammer kanten på canvas, så ændres retningen
    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.xDirection *= -1;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.yDirection *= -1;
    }

    this.x += this.xDirection * this.moveSpeed;
    this.y += this.yDirection * this.moveSpeed;
  }
}

// Ved at bruge nedarvning er det nemt at lave en anden rød mand som også er sur men som opfører sig lidt anderledes.
class RedAngryMan extends AngryMan {
  constructor(colour, maxGrowSpeed) {
    super(colour);
    // Røde sure mænd oprettes med forskellige voksehastigheder
    this.growSpeed = random(maxGrowSpeed);
  }

  // Da update metoden for GreenAngryMan klassen har "heroMan" som argument, så er vi også nød til at have dette objekt som argument her. Herved kan vi opnå at de tre typer sure mænd håndteres.
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
    // Den bruger heroMan's position til at følge efter ham
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

  // En sur grøn man skal se anderledes ud, så vi overskriver "show" metoden i AngryMan klassen så grønne mænd får solbriller.
  show() {
    let colourWidhAlpha = color(this.colour);
    colourWidhAlpha.setAlpha(this.colourAlpha);
    fill(colourWidhAlpha);
    circle(this.x, this.y, this.radius * 2);
    fill(0);
    circle(this.x - 8, this.y - 8, 10);
    circle(this.x + 8, this.y - 8, 10);
    strokeWeight(2);
    line(this.x - 12, this.y - 12, this.x - 22, this.y - 18);
    line(this.x - 10, this.y - 12, this.x + 10, this.y - 12);
    line(this.x + 12, this.y - 12, this.x + 22, this.y - 18);
    strokeWeight(1);
    ellipse(this.x, this.y + 15, 15, 15);
  }
}

// Generisk klasse der kan bruges til de forskellige knapper. En knap skal således ikke forholde sig til hvad den bliver brug til. Den skal bare kende dens label (teksten på knappen) og om den er blevet trykket på.
class Button {
  constructor(label) {
    this.label = label;
    this.x = 0;
    this.y = 0;
    this.buttonWidth = 0;
    this.buttonHeight = 0;
    this.wasClicked = false;
  }

  update(x, y, buttonWidth, buttonHeight) {
    this.x = x;
    this.y = y;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.wasClicked = false;
  }

  show() {
    fill(100);
    rect(this.x, this.y, this.buttonWidth, this.buttonHeight);
    fill(255);
    textSize(18);
    text(this.label, this.x + 10, this.y + 22);
  }

  isClicked() {
    this.wasClicked =
      mouseX > this.x &&
      mouseX < this.x + this.buttonWidth &&
      mouseY > this.y &&
      mouseY < this.y + this.buttonHeight;
    return this.wasClicked;
  }

  getWasClicked() {
    return this.wasClicked;
  }
}
