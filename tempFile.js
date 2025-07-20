// Explanation of program structure - Part 5
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let imageObject;

async function setup() {
  createCanvas(400, 400);

  // Here images are loaded into the computer's memory so that they are ready immediately when you need to use them
  imageObject = await loadImage("firestairs330x330.png");
}

function draw() {
  background(100);

  image(imageObject, 30, 30, 330, 330);
}
