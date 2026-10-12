const fileUrl = './fake-code.txt';
const codeDisplayElement = document.getElementById('codeDisplay')
const codeInputElement = document.getElementById('codeInput')

fetch(fileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.text();
    })
    .then(data => {
        const lines = data.split('\n');
        const shuffledLines = shuffleArray(lines);
        // console.log(shuffledLines)
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
}

function hideGameWindow() {
    console.log("I was clicked")
    const gameWindow = document.getElementById("game-window");
    gameWindow.style.display = "none";
}

codeInputElement.addEventListener('input', () => {
    const display = document.querySelector('#codeDisplay')
    let words = display.textContent.split(' ')
    words =  words.map(word => {
        let letters = word.split('');
        letters = letters.map(letter => `<span class=word_inner>${letter}</span>`)
        return letters.join('');
    });
    words = words.map(word => `<span class="word">${word}</span>`)
    display.innerHTML = words.join(' ')
    console.log(display.innerHTML);
})