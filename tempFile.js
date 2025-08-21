// Conditions
// Programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(0); 

  // The code inside this block is only executed when the mouse is pressed
  if (mouseIsPressed) {
    fill(0, 255, 0); // RGB colors (red, green, blue)
    textSize(24);
    text("You are pressing the mouse!", 10, 50);
  }
}
