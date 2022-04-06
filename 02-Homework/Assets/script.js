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
var storedScores = JSON.parse(localStorage.getItem("score"));

console.log(storedScores)

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
  if (storedScores === null) {
    scoreArray.push(...currentScoreArray);
    localStorage.setItem("score", JSON.stringify(scoreArray));
    var node = document.createElement("li");
    var textnode = document.createTextNode(
      scoreArray[0] + "  " + scoreArray[1]
    );
    node.appendChild(textnode);
    document.getElementById("scoreList").appendChild(node)
  } else {

    storedScores.push(...currentScoreArray)
    localStorage.setItem("score", JSON.stringify(storedScores));
    showHighscores();
  }
});

function showHighscores() {
  answers.innerHTML = "";
  timePara.textContent = "";
  // pull high scores from local storage

  
  for (let i = 0; i < storedScores.length; i = i + 2) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(
      storedScores[i] + "  " + storedScores[i + 1]
    );
    node.appendChild(textnode);
    document.getElementById("scoreList").appendChild(node);
  }
}


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
