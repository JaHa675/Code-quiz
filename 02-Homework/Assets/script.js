// TODO: declare variables
var startbtn = document.getElementById("startbtn");
var timePara = document.getElementById("timer");
var initialsForm = document.getElementById("initialsForm");
var questionText = document.getElementById("question-text");
var currentQuestionIndex = 0;
var timeLeft = 60;
// TODO: store high score(time) and initials

// TODO: pull high scores from local storage

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

// TODO: start timer function
function timerStart() {
  // TODO: starts the timer and adds it to the screen
  timePara.textContent = "Timer: " + timeLeft;

  timer = setInterval(function () {
    console.log(timeLeft);
    timeLeft--;
    timePara.textContent = "Timer: " + timeLeft;
    if (timeLeft <= 0) {
      console.log("go faster next time");
      clearInterval(timer)
      timePara.textContent = "Timer: ";
    }
  }, 1000);
}

// TODO: end game function
function endQuiz() {
  // TODO: record what timer was at
  console.log("games done");
  var currentScore = timeLeft;
  localStorage.setItem("score", currentScore);
  // TODO: needs to remove last question from screen
  answers.innerHTML = "";
  questionText.innerHTML = "Your score: " + currentScore;


  // stop timer
  clearInterval(timer);
  timePara.textContent = "Timer: ";
  // TODO: show enter initials screen
initialsForm.classList.remove("hidden");


}
// TODO: clear high scores button
// TODO: needs to erase the local storage for high scores and initials

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
