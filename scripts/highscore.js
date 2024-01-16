function printScore() {
    // Get scores from localstorage or set to empty array
    let scores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // Sort highscores by score property in descending order
    scores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    scores.forEach(function(score) {
      // Create li element for each high score
      let liEl = document.createElement("li");
      liEl.textContent = score.initials + " - " + score.score;
  
      // Display on page
      let olEl = document.getElementById("highscores");
      olEl.appendChild(liEl);
    });
  }

  function clearScore() {
    // Clear the score
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearScore;
  
  // Run function when page loads
  printScore();