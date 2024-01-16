// Setting DOM elements
let questionsEl = document.querySelector("#questions"),
    timerEl = document.querySelector("#time"),
    choicesEl = document.querySelector("#choices"),
    submitBtn = document.querySelector("#submit"),
    startBtn = document.querySelector("#start"),
    initialsEl = document.querySelector("#initials"),
    feedbackEl = document.querySelector("#feedback")

// Quiz calculator letiables
let currentQuestionIndex = 0,
    time = questionaire.length * 15,
    timerId

function startQuiz() {
  // Hide start screen and reveals the questions section
  let startScreenEl = document.getElementById("start-screen")
  startScreenEl.setAttribute("class", "hide")

  // Un-hides questions section
  questionsEl.removeAttribute("class")

  // Initiate a timer every second
  timerId = setInterval(clockTick, 1000)

  // Display the time on the page
  timerEl.textContent = time

  getQuestion()
}

function getQuestion() {
  // Retrieve current question from the questionaire array
  let currentQuestion = questionaire[currentQuestionIndex]

  // Update title with current question
  let titleEl = document.getElementById("question-title")
  titleEl.textContent = currentQuestion.question

  // Clear the previous question choices
  choicesEl.innerHTML = ""

  // Loop over choices
  currentQuestion.choiceArray.forEach(function(choice, i) {
    // Create new button for each choice
    let choiceNode = document.createElement("button")
    choiceNode.setAttribute("class", "choice")
    choiceNode.setAttribute("value", choice)

    choiceNode.textContent = i + 1 + ". " + choice

    // Attach click event listener to each choice
    choiceNode.onclick = questionClick

    // Display on the page
    choicesEl.appendChild(choiceNode)
})
}

function questionClick() {
  // Check if user guessed wrong
  if (this.value !== questionaire[currentQuestionIndex].answer) {
    // Penalize time
    time -= 20;

    if (time < 0) {
      time = 0;
    }
    // Display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // Flash right/wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  currentQuestionIndex++;

  // Time checker
  if (currentQuestionIndex === questionaire.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stop timer
  clearInterval(timerId);

  // Show end screen
  let endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Show final score
  let finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
      // Update time
      time--;
      timerEl.textContent = time;
    
      // Check if user ran out of time
      if (time <= 0) {
        quizEnd();
      }
}

function saveHighscore() {
  // Get value of input box
  let initials = initialsEl.value.trim();
  if (initials !== "") {
    // Get saved scores from localstorage, or if not any, set to empty array
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object for current user
    let newScore = {
      score: time,
      initials: initials
    };

    // Save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
    saveHighscore();
    }
}

// Submit initials
submitBtn.onclick = saveHighscore;

// Start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;