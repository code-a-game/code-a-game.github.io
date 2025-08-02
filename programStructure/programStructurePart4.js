// Forklaring af program struktur - Del4
// programmering = 'Slip fantasien løs' / Jens Valdez
// https://code-a-game.github.io

let x

function setup() {
  createCanvas(400, 400);

  // Man og AngryMan oprettes med (x, y)
  man = new Man(80, 80)
  angryMan = new AngryMan(280, 100);
  x = 180
  happyMan = new HappyMan(x);
}

function draw() {
  background(220);

  man.show()
  man.showFaceExpression()
  happyMan.show();
  happyMan.showFaceExpression()
  happyMan.showHat()
  angryMan.show();
  angryMan.showFaceExpression()
}


// Et mand objekt af klassen "Man" har en pladsering og vises som en cirkel med to øjne. Her udover kan vise  hans ansigtsudtryk.
class Man {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 25
  }

  show() {
    fill("green");
    circle(this.x, this.y, this.r * 2);
    fill(0);
    circle(this.x - 8, this.y - 8, 10);
    circle(this.x + 8, this.y - 8, 10);
  }
  showFaceExpression(){
    line(this.x - 8, this.y + 8, this.x + 8, this.y + 8);
  }
}

// Man kan lave en anden klasse (I dette tilælde ved navn "HappyMan") som nedarver egenskaberne fra "Man" klassen. Objekter der er af "HappyMan" klassen har derfor også en pladsering og en metode til at vise ansigtsudtrykket. Ved at nedarve egenskaber fra en anden klasse kan man undgå at have kopier af samme kode i sit program hvilket gør programmet nemmere at overskue og tilrette. Man nedarver ved at bruge ordet extends som vist nedenfor. På engelsk hedder nedarvning "inheritance".
class HappyMan extends Man {
  constructor(x) {
    let y = 60
    // Når man nedarver skal man kalde constructor metoden defineret i den klasse der nedarves fra. Dette gør man ved at skrive super som vist nedenfor. Man kalder den klasse der nedarves fra for dens "parent class" (ellse "super class").
    super(x, y);
  }

  // "HappyMan" klassen har en metode som "Man" klassen ikke har
  showHat() {
    rect(this.x - 40, this.y - 25, 80, 5)
    rect(this.x - 20, this.y - 55, 40, 35)
  }
}

class AngryMan extends Man {
  constructor(x, y) {
    super(x, y);
    // Når "show" metoden i "Man" klassen kaldes, så overskrives den radius der er defineret i "Man" klassen med den radius der er defineret i "AngryMan" klassen.
    this.r = 50;
  }

  // "AngryMan" klassen har sin egen metode til at vise ansigtsudtrykket. Det er denne metode der kaldes og ikke den metode med samme navn der er defineret i "Man" klassen.
  showFaceExpression(){
    ellipse(this.x, this.y + 10, random(10, 20), random(10, 15));
  }
}
