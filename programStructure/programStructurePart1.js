// Programstruktur - Del 1
// Dette er et simpelt program skrevet til dig, der er ny til programmering!
//
// Et program består af to vigtige dele:
// 1. Først kører computeren funktionen setup én gang.
// 2. Derefter kører computeren funktionen draw igen og igen (ca. 60 gange i sekundet).
//
// Når du lægger kode ind i setup og draw, fortæller du computeren, hvad den skal gøre.
// Programmet her viser fire koordinater på skærmen og tegner en hvid cirkel.

function setup() {
  // createCanvas laver et "lærred" (canvas) hvor du kan tegne. 400 betyder bredden, 400 betyder højden.
  // (0,0) er øverst til venstre. X vokser mod højre, Y vokser nedad.
  createCanvas(400, 400);
}

function draw() {
  // background sætter baggrundsfarven. 100 er en grå farve (0=sort, 255=hvid).
  background(100);

  // textSize bestemmer hvor stor teksten skal være.
  textSize(18);
  // fill bestemmer farven på teksten (0=sort).
  fill(0);
  // text viser tekst på skærmen. Første argument er teksten, de næste to er x og y positionen.
  text("(30,30)", 30, 30);
  text("(310,30)", 310, 30);
  text("(30,375)", 30, 375);
  text("(310,375)", 310, 375);

  // Her tegner vi to cirkeler ved at kalde den indbyggede p5js funktion ved navn "circle" med argumenterne (x, y, diameter)
  fill('red')
  circle(100, 200, 30)  
  fill('blue')
  circle(100, 250, 30)  
}
// Prøv at ændre tallene og se hvad der sker!
