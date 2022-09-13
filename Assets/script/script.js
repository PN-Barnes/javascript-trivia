//  * Pointer Variables * //
// ?----------- Home Page Variables -----------? //
var startQuizContent = document.getElementById('startQuizContent');
var startButton = document.getElementById('startButton');
// ? ----------- END HOME PAGE VARIABLES -----------? //
// *----------- QUIZ Variables -----------* //
var quizContainer = document.getElementById('quiz');
var testTime = 60;
var timer = document.getElementById('timer');
var score = 0;
var scoreBank = [];
var scoreTracker = document.getElementById('scoreTracker');
var prompt = document.getElementById('prompt');
var answerBank = document.getElementById('answerBank');
// *----------- END QUIZ Variables -----------* //
// ----------- ENDGAME VARIABLES ----------- //
var gameOver = document.getElementById('gameOver');
var messageDiv = document.getElementById('messageDiv');
var playerInitials = document.getElementById('playerInitials');
var submitScore = document.getElementById('scoreSubmit');
var scores = document.getElementById('scores');
var finalScore = document.getElementById('finalScore');
var returnHome = document.getElementById('homeReturn');
var createLi = document.createElement('li');
// ----------- END ENDGAME VARIABLES ----------- //
// !----------- SCOREBOARD VARIABLES -----------! //
var highScoresButton = document.getElementById('highScoreButton');
var scoreboard = document.getElementById('scoreboard');

// !----------- END SCOREBOARD VARIABLES -----------! //

// * Display normal state * //
quizContainer.style.display = 'none';
timer.style.display = 'hidden';
gameOver.style.display = 'none';
messageDiv.style.display = 'none';
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
// ! Event Listeners ! //
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

highScoresButton.addEventListener('click', function () {
  startQuizContent.style.display = 'none';
  quizContainer.style.display = 'none';
  timer.style.display = 'none';
  gameOver.style.display = 'none';
  messageDiv.style.display = 'none';
  scoreboard.style.display = 'block';
  for (i = 0; i < localStorage.length; i++) {
    createLi.innerHTML = `${JSON.parse(
      localStorage.key(i)
    )}: ${localStorage.getItem(localStorage.key(i))}`;
    scoreList.appendChild(createLi);
  }
});

startButton.addEventListener('click', function () {
  setTimer();
  timer.style.display = 'block';
  quizContainer.style.display = 'block';
  startTest();
  startQuizContent.style.display = 'none';
});
submitScore.addEventListener('click', function (event) {
  event.preventDefault();
  scoreBank.push(score);
  messageDiv.style.display = 'block';
  localStorage.setItem(JSON.stringify(playerInitials.value), score);
  endGame();
});
returnHome.addEventListener('click', function () {
  startQuizContent.style.display = 'block';
  quizContainer.style.display = 'none';
  timer.style.display = 'hidden';
  gameOver.style.display = 'none';
  messageDiv.style.display = 'none';
  scoreboard.style.display = 'none';
});
// ! END Event listeners ! //
function endGame() {
  quizContainer.style.display = 'none';
  startQuizContent.style.display = 'none';
  gameOver.style.display = 'block';
  finalScore.textContent = `Final Score: ${score}`;
  for (i = 0; i < localStorage.length; i++) {
    createLi.innerHTML =
      playerInitials.value + ': ' + localStorage.key(i).value;
    scores.innerHTML = createLi;
  }
}

// var scoreboard = JSON.parse(localStorage.getItem('highscores'));
