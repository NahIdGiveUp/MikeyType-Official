const fileUrl = './fake-code.txt';
const codeDisplayElement = document.getElementById('codeDisplay')
const codeInputElement = document.getElementById('codeInput')

// This fetches the content of the text file
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

// This hides the game windows
function hideGameWindow() {
    console.log("I was clicked")
    const gameWindow = document.getElementById("game-window");
    gameWindow.style.display = "none";
}

// This basically finds the letters and spaces in the div and splits them into seperate spans with the classes letters and space 
// so that they can be styled individually
function formatCodeDisplay(display) {
    let text = display.textContent;
    let tokens = text.split(/(\s+)/);

    let formattedTokens = tokens.map(token => {
        if (/^\s+$/.test(token)) {
            return `<span class="space">${token}</span>`;
        }
        let letters = token.split('').map(letter => `<span class="letters">${letter}</span>`).join('');
        return letters
    });
    display.innerHTML = formattedTokens.join('');
}

// codeInputElement.addEventListener('input', () => {

// })