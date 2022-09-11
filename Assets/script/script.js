//  * Pointer Variables * //
var startQuizContent = document.getElementById('startQuizContent');
var startButton = document.getElementById('startButton');
var quizContainer = document.getElementById('quiz');
var timer = document.getElementById('timer');
var testTime = 60;
var score = 0;
var scoreTracker = document.getElementById('scoreTracker');
var prompt = document.getElementById('prompt');
var answerBank = document.getElementById('answerBank');
var gameOver = document.getElementById('gameOver');
var playerInitials = document.getElementById('playerInitials');
var submitScore = document.getElementById('scoreSubmit');
var scoreboard = document.getElementById('scoreboard');
var scores = document.getElementById('scores');
var returnHome = document.getElementById('homeReturn');
var createLi = document.createElement('li');
var scoreBank = [];

// * Display normal state * //
quizContainer.style.display = 'none';
gameOver.style.display = 'none';
scoreboard.style.display = 'none';

var questionNum = 0;
var questions = [
  {
    prompt:
      "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
    answers: ['if(x2)', 'if(x = 2)', 'if(x === 2)', 'if(x != 2)'],
    correct: 2,
    // correct answer [2] //
  },
  {
    prompt:
      'Which of the following function of Array object creates a new array with all of the elements of this array for which the provided filtering function returns true?',
    answers: ['concat()', 'every()', 'filter()', 'some()'],
    correct: 2,
  },
  {
    prompt:
      'Which of the following function of Array object removes the first element from an array and returns that element?',
    answers: ['reverse()', 'shift()', 'slice()', 'some()'], // correct answer
    correct: 1,
  },
  {
    prompt:
      'Which of the following method of Boolean object returns a string depending upon the value of the object?',
    answers: ['valueOf()', 'toSource()', 'none', 'toString()'],
    correct: 3, // Correct answer
  },
  {
    prompt:
      'What is the function of Array object that runs through each element of the array?',
    answers: ['every()', 'forEach()', 'filter()', 'concat()'], // Correct answer
    correct: 1,
  },
];
var questionPrompt = questions[questionNum].prompt;

// ! END OF ARRAY

/*  */
function setTimer() {
  var timerInterval = setInterval(function () {
    timer.textContent = testTime;
    if (testTime <= 0 || questionNum === questions.length) {
      clearInterval(timerInterval);
      timer.textContent = 'GAME OVER';
      endGame();
    }
    testTime--;
  }, 1000);
}

function startTest() {
  if (questionNum === questions.length) {
    endGame();
  } else {
    var questionPrompt = questions[questionNum].prompt;
    var questionChoices = questions[questionNum].answers;
    prompt.textContent = questionPrompt;
    button1 = document.getElementById('button1');
    button2 = document.getElementById('button2');
    button3 = document.getElementById('button3');
    button4 = document.getElementById('button4');
    scoreTracker.textContent = score;
    button1.textContent = questionChoices[0];
    button2.textContent = questionChoices[1];
    button3.textContent = questionChoices[2];
    button4.textContent = questionChoices[3];
  }
}

answerBank.addEventListener('click', function (event) {
  userChoice = event.target;
  var questionChoices = questions[questionNum].answers;
  console.log(userChoice.textContent);

  if (
    userChoice.textContent === questionChoices[questions[questionNum].correct]
  ) {
    score += 10;
    console.log('CORRECT');
    console.log(score);
  } else {
    testTime -= 10;
    console.log(score);
  }
  if (questionNum !== questions.length) {
    questionNum++;
    startTest();
    console.log(questionNum);
  } else {
    endGame();
  }
});

startButton.addEventListener('click', function () {
  setTimer();
  quizContainer.style.display = 'block';
  startTest();
  startQuizContent.style.display = 'none';
});
submitScore.addEventListener('click', function (event) {
  event.preventDefault();
  scoreBank.push(score);
  localStorage.setItem('score', score);
  endGame();
});

function endGame() {
  quizContainer.style.display = 'none';
  startQuizContent.style.display = 'none';
  gameOver.style.display = 'block';

  for (i = 0; i < localStorage.length; i++) {
    createLi.innerHTML = userinitial.value + ': ' + localStorage.key(i).value;
    scores.innerHTML = createLI;
  }
}

var highscores = JSON.parse(localStorage.getItem('highscores'));
