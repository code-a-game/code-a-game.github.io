//QuizSubtask1
// programming = 'Set your imagination free' / Jens Valdez
// https://code-a-game.github.io

let gameState;

let currentQuestion = 0;
let yPositionForQuestionsToStart = 0;

var questions = [
  {
    question: "Question 1",
    options: ["Q1 Option 1", "Q1 Option 2", "Q1 Option 3"],
    selected: -1,
    correct: 0,
  },
  {
    question: "Question 2",
    options: ["Q2 Option 1", "Q2 Option 2", "Q2 Option 3"],
    selected: -1,
    correct: 0,
  },
];

function setup() {
  createCanvas(400, 320);
  textSize(15);
  fill(255);
  gameState = "QUIZ-QUESTIONS";
}

function draw() {
  background(100);

  switch (gameState) {
    case "QUIZ-QUESTIONS":
      if (currentQuestion == questions.length) {
        gameState = "QUIZ-FINISHED-SCREEN";
      } else {
        showQuestionsToAnswer();
      }
      break;
    case "QUIZ-FINISHED-SCREEN":
      showFinalResult();
      break;
  }
}

function showQuestionsToAnswer() {
  fill(0);
  rect(10, 30, 380, 70);
  yPositionForQuestionsToStart = 30;

  fill(255);

  text(questions[currentQuestion].question, 10, 20);

  if (questions[currentQuestion].selected == -1) {
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
      yPositionForQuestionsToStart += 20;
      text(
        "Tryk " +
        (i + 1) +
        " på keyboarded: " +
        questions[currentQuestion].options[i],
        20,
        yPositionForQuestionsToStart
      );
    }
  } else {
    currentQuestion++;
  }
}

function keyPressed() {
  if (currentQuestion < questions.length) {
    if (key == "1") {
      questions[currentQuestion].selected = 0;
    }
    if (key == "2") {
      questions[currentQuestion].selected = 1;
    }
    if (key == "3") {
      questions[currentQuestion].selected = 2;
    }
  }
}

function showFinalResult() {
  fill(255);
  text("Quizen er færdig", 10, 20);
}
