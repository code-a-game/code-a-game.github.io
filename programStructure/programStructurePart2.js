// Forklaring af program struktur - Del2
// programmering = 'Slip fantasien løs' / Jens Valdez
// https://code-a-game.github.io

// Denne variabel kan bruges i hele programmet. Dette hedder at den har globalt scope:
// Man definerer en variabel ved at skriver let og herefter variabel navnet. Variablen ved navn "radius" får tildelt værdien 15. Man kan også vælge kun at definere en variabel her og så tildele den en værdi senere.
let radius = 15  

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100);

    // Hvis musen er på på den højre side i canvas så tegner vi med blå farve
  // og ellers tegner vi med rød farve
  if (mouseX > 200){
    fill('blue')
  } else {
    fill('red')
  }
  
  // Her defineres en variabler der kun kan bruges i de efterfølgende linier i draw funktionen. Når en variabel ikke har globalt scope, så har den lokalt scope.
  let x = 40
  let y = 200
  
  // Variablen "i" defineres inde i for løkken. Den har lokalt scope og kan derfor kun bruges inde i for løkken
  // i++ betyder at i tælles en op. Det er det samme som at skrive i = i + 1
  // I dette tilfælde udføres de fire kode linier inde i for løkken 5 gange dvs. hvor i er hhv. 0, 1, 2, 3 og 4. Man kalder en kode linie for et statement.
  // Hver gang vi har tegnet en cirkel, så rykkes den næste cirkel 40 til højre.
  for (let i = 0; i < 5; i++) {

    x = x + 40;
  // Vi kalder funktionen ved navn drawCircle med et argumenterne (x, y). Værdierne som "x" og "y" indeholder overføres til funktionen defineret nedenfor.
     drawCircle(x, y)
  }
  
    fill(0)
  text(int(mouseX) + ", " + int(mouseY), mouseX, mouseY)
}

// Her laver vi vores egen funktion som vi kalder fra draw funktionen. Den tager to parametre. Der hvor man definerer funktionen kalder man det parametre, dvs. at funktionen har en eller flere parametre, hvorimod når man benytter funktionen siger man at man kalder den med et eller flere argumenter. 
function drawCircle(xKoordinat, yKoordinat){
  circle(xKoordinat, yKoordinat, radius*2)  
}