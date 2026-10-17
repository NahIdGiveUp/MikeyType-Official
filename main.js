const fileUrl = "./fake-code.txt";
const codeDisplayElement = document.getElementById("codeDisplay");
const codeInputElement = document.getElementById("codeInput");

// This fetches the content of the text file
async function getRandomCode() {
  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.text();
    // This splits the snippets of code in the text file into an array of lines
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");
    const shuffledLines = shuffleArray(lines);

    return shuffledLines[0];
  } catch (error) {
    console.error("Unable to read the file:", error);
    return null;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function displayText(text) {
  const outputElement = document.getElementById("codeDisplay");

  if (!outputElement) {
    throw new Error('Element with id "codeDisplay" was not found.');
  }

  outputElement.textContent = text;
  // This function is called here, as it is after the content is added into the div
  formatCodeDisplay(outputElement);
}

async function generateNewCode() {
  const code = await getRandomCode();
  // This makes it so it only displays more when the display is empty
  if (code === null) return;

  displayText(code);
  // This clears the textarea after the user gets everything correct
  codeInputElement.value = "";
}

// These functions below allows the game window to be toggled on and off
function hideGameWindow() {
  const gameWindow = document.getElementById("game-window");
  gameWindow.style.display = "none";
}

function showGameWindow() {
  const gameWindow = document.getElementById("game-window");
  gameWindow.style.display = "block";
}

function toggleGameWindow() {
  const gameWindow = document.getElementById("game-window");
  if (gameWindow.style.display == "none") {
    gameWindow.style.display = "block";
  } else {
    gameWindow.style.display = "none";
  }
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
// This basically finds the letters and spaces in the div and splits them into seperate spans with the classes letters and space
// so that they can be styled individually
function formatCodeDisplay(display) {
  let text = display.textContent;
  let tokens = text.split(/(\s+)/);

  let formattedTokens = tokens.map((token) => {
    if (/^\s+$/.test(token)) {
      return `<span>${token}</span>`;
    }
    let letters = token
      .split("")
      .map((letter) => `<span>${letter}</span>`)
      .join("");
    return letters;
  });
  display.innerHTML = formattedTokens.join("");
}

// This uses the query selector all to find all of the text in the div, and splits the input into different its own characters
codeInputElement.addEventListener("input", () => {
  // This calls the function beginTimer, which is below, when the timer have not started and the game have not ended
  if (!timerStarted && !gameEnded) beginTimer();
  const arrayCode = codeDisplayElement.querySelectorAll("span");
  const arrayInput = codeInputElement.value.split("");
  // When the correct is true it will start a new one
  let correct = arrayInput.length === arrayCode.length;
  let correctCount = 0;
  arrayCode.forEach((characterSpan, index) => {
    const character = arrayInput[index];
    // Then it compares the characters of the input to the display, and adds the correct and incorrect class to the display, and it is styled seperately.
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character == characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      // if it is correct it adds to the correct count
      correctCount++;
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    }
  });
  currentCorrectChars = correctCount;
  // resets the wpm after everything is correct
  if (correct) {
    totalCorrectChars += arrayCode.length;
    currentCorrectChars = 0;
    generateNewCode();
  }
  updateWpm();
});
  
let timerInterval;
let timeleft = 60;
let gameEnded = false;
const timerDisplay = document.querySelector("#timer");
let timerStarted = false;
// This function sets up the timer and resets it to 60 seconds without starting it
function resetTimer(duration) {
  clearInterval(timerInterval);
  timeleft = duration;
  gameEnded = false;
  timerStarted = false;
  codeInputElement.disabled = false;
  codeInputElement.value = "";
  totalCorrectChars = 0;
  currentCorrectChars = 0;
  wpmElement.textContent = "0";

  timerDisplay.textContent = "01:00";
}
// This function allows something else to start the timer
function beginTimer() {
  timerStarted = true;
  // This checks the time every 1000ms which is 1 second
  timerInterval = setInterval(() => {
    timeleft--;
    // These calculate how many minutes and seconds are left
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;

    timerDisplay.textContent =
    // This displays the amount of time left, padding the empty numbers with 0 with padStart
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    updateWpm();
    // This clears the timer which was set with setInterval with clearInterval
    // It also disables the user from typing in the textarea
    if (timeleft <= 0) {
      clearInterval(timerInterval);
      gameEnded = true;
      codeInputElement.disabled = true;
    }
  }, 1000);
}
// This resets the timer to 60 seconds when the website loads
window.addEventListener("load", () => {
  resetTimer(gameDuration);
});

const wpmElement = document.getElementById("wpm");
const gameDuration = 60;

let totalCorrectChars = 0;
let currentCorrectChars = 0;
// This calculates the WPM of the user 
function updateWpm() {
  const elapsedSeconds = gameDuration - timeleft;
  if (elapsedSeconds <= 0) {
    wpmElement.textContent = "0";
    return;
  }
  // This uses the standard WPM formula of (correct characters / 5 / minutes)
  const words = (totalCorrectChars + currentCorrectChars) / 5;
  const minutes = Math.max(elapsedSeconds, 1) / 60;
  wpmElement.textContent = Math.round(words / minutes);
}

function resetGame() {
  resetTimer(60);
  generateNewCode();
}

document.getElementById('resetButton').addEventListener("click", resetGame)

startTime();
generateNewCode();
