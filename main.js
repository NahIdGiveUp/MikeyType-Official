const fileUrl = './fake-code.txt';
const codeDisplayElement = document.getElementById('codeDisplay')
const codeInputElement = document.getElementById('codeInput')

// This fetches the content of the text file
function getRandomCode() {
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.text();
        })
        // This splits the content into seperate lines and shuffles it into different arrays
        // Then it displays the first array in the div codeDisplay
        .then(data => {
            const lines = data.split('\n');
            const shuffledLines = shuffleArray(lines);
            console.log(shuffledLines)
            displayText(shuffledLines[1]);
        })
        .catch(error => {
            console.error('Unable to read the file:', error);
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function displayText(text) {
    const outputElement = document.getElementById('codeDisplay');

    if (!outputElement) {
        throw new Error('Element with id "codeDisplay" was not found.');
    }

    outputElement.textContent = text;
    // This function is called here, as it is after the content is added into the div
    formatCodeDisplay(outputElement)
}

async function generateNewCode() {
    const code = await getRandomCode()
    displayText(code)
    // this clears the textarea after the user gets everything correct
    codeInputElement.value = '';
    // startTimer()
}

// This hides the game windows
function hideGameWindow() {
    console.log("I was clicked")
    const gameWindow = document.getElementById("game-window");
    gameWindow.style.display = "none";
}

function showGameWindow() {
    console.log("I was clicked")
    const gameWindow = document.getElementById("game-window");
    gameWindow.style.display = "block";
}

function toggleGameWindow() {
    console.log("I was clicked")
    const gameWindow = document.getElementById("game-window");
    if (gameWindow.style.display == "none") {
        gameWindow.style.display = "block";
    }
    else {
        gameWindow.style.display = "none";
    }
}
// This basically finds the letters and spaces in the div and splits them into seperate spans with the classes letters and space 
// so that they can be styled individually
function formatCodeDisplay(display) {
    let text = display.textContent;
    let tokens = text.split(/(\s+)/);

    let formattedTokens = tokens.map(token => {
        if (/^\s+$/.test(token)) {
            return `<span>${token}</span>`;
        }
        let letters = token.split('').map(letter => `<span>${letter}</span>`).join('');
        return letters
    });
    display.innerHTML = formattedTokens.join('');
}

// This uses the query selector all to find all of the text in the div, and splits the input into different its own characters
codeInputElement.addEventListener('input', () => {
    const arrayCode = codeDisplayElement.querySelectorAll('span')
    const arrayInput = codeInputElement.value.split('')
    // When the correct is true it will start a new one
    let correct = true
    arrayCode.forEach((characterSpan, index) => {
        const character = arrayInput[index]
        // Then it compares the characters of the input to the display, and adds the correct and incorrect class to the display, and it is styled seperately.
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character == characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    });

    if (correct) generateNewCode()
})

// function startTimer() {
//     let timeleft = 60

// }

generateNewCode()