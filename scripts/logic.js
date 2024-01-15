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
  // Penalize time
  // Display new time on page
  // Flash right/wrong feedback
  // Next question
  // Time checker
}

function quizEnd() {
  // Stop timer
  // Show end screen
  // Show final score
  // Hide questions section
}

function clockTick() {
  // Update time
  // Check if user run out of time
}

function saveHighscore() {
  // Get value of input box
  let initials = initialsEl.value.trim();
  // Get saved scores from localstorage, or if not any, set to empty array
  // Format new score object for current user
  // Save to localstorage
  // Redirect to next page
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