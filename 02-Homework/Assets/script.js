// TODO: declare variables
var startbtn = document.getElementById("startbtn");
var timePara = document.getElementById("timer");
var questionText = document.getElementById("question-text");
var initialsForm = document.getElementById("initialsForm");
var submitBtn = document.getElementById("submitBtn");
var scoreList = document.getElementById("scoreList");
var currentQuestionIndex = 0;
var timeLeft = 60;
var currentScore = 0;
var scoreArray = [];
var score = localStorage.getItem("score");
var storedScores = [];

// start game function
startbtn.addEventListener("click", function (event) {
  // move start button off the screen
  startbtn.setAttribute("class", "hidden");
  // call next question function
  showNextQuestion();
  //   start timer
  timerStart();
});

// next question function
var showNextQuestion = function () {
  // put next question on the page responsively

  var currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.title;
  answers.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "answer");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;

    choiceBtn.onclick = answerClick;

    answers.appendChild(choiceBtn);
  });
};

function answerClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    console.log("wrong");
    timeLeft = timeLeft - 3;
    timePara.textContent = "Timer: " + timeLeft;
  } else {
    console.log("right");

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      console.log("show the end screen now");
      endQuiz();
    } else {
      showNextQuestion();
    }
  }
}

// start timer function
function timerStart() {
  // starts the timer and adds it to the screen
  timePara.textContent = "Timer: " + timeLeft;

  timer = setInterval(function () {
    console.log(timeLeft);
    timeLeft--;
    timePara.textContent = "Timer: " + timeLeft;
    if (timeLeft <= 0) {
      console.log("go faster next time");
      clearInterval(timer);
      timePara.textContent = "Timer: ";
    }
  }, 1000);
}

// end game function
function endQuiz() {
  // record what timer was at
  console.log("games done");
  currentScore = timeLeft;
  // needs to remove last question from screen
  answers.innerHTML = "";
  questionText.innerHTML = "Your score: " + currentScore;

  // stop timer
  clearInterval(timer);
  timePara.textContent = "Timer: ";
  // show enter initials screen
  initialsForm.classList.remove("hidden");
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInitials = document.getElementById("initialsBox").value;
  var currentScoreArray = [userInitials, currentScore];

  // store high score(time) and initials
  if (storedScores.length > 0) {
    scoreArray = JSON.parse(localStorage.getItem("score"));
    scoreArray.push(...currentScoreArray);
    localStorage.setItem("score", JSON.stringify(scoreArray));
  } else {
    localStorage.setItem("score", JSON.stringify(currentScoreArray));
    var firstScore = document.createElement("li");
    var firstScoreText = document.createTextNode(
      currentScoreArray[0] + "  " + currentScoreArray[1]
    );
    firstScore.appendChild(firstScoreText);
    document.getElementById("scoreList").appendChild(firstScore);
  }
  showHighscores();
});

function showHighscores() {
  answers.innerHTML = "";
  timePara.textContent = "";

  // pull high scores from local storage
  storedScores = JSON.parse(localStorage.getItem("score"));

  for (let i = 0; i < storedScores.length; i = i + 2) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(
      storedScores[i] + "  " + storedScores[i + 1]
    );
    node.appendChild(textnode);
    document.getElementById("scoreList").appendChild(node);
  }
}
// needs to erase the local storage for high scores and initials



// store high score(time) and initials

var questions = [
  {
    title: "this is a question",
    choices: ["choice a", "choice b", "choice c", "choice d"],
    answer: "choice b",
  },
  {
    title: "this is a question",
    choices: ["choice a", "choice b", "choice c", "choice d"],
    answer: "choice b",
  },
  {
    title: "this is a question",
    choices: ["choice a", "choice b", "choice c", "choice d"],
    answer: "choice b",
  },
  {
    title: "this is a question",
    choices: ["choice a", "choice b", "choice c", "choice d"],
    answer: "choice b",
  },
];
