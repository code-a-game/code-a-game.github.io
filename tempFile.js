// for loop
// Programming = 'Unleash your imagination' / Jens Valdez
// https://code-a-game.github.io

// These variables can be used throughout the program
let x, myAlpha;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0); 

  x = 40;
  myAlpha = 200;

  // The variable "i" can only be used inside the for loop.
  // i++ means that i is incremented by one (equivalent to i = i + 1).
  // The for loop runs 5 times, where i takes the values 0, 1, 2, 3, and 4.
  // Each time, a circle is drawn, moved 40 pixels to the right, and its transparency is reduced.
  for (let i = 0; i < 5; i++) {
    fill(0, 0, 255, myAlpha);
    circle(x, 30, 30);

    x = x + 40; // Move the circle 40 pixels to the right
    myAlpha = myAlpha - 30; // Reduce the transparency
  }
}
