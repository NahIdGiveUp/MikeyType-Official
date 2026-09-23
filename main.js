const fileUrl = './fake-code.txt';
const codeDisplayElement = document.getElementById('codeDisplay')
const codeInputElement = document.getElementById('codeInput')

// codeInputElement.addEventlistener('input', () => {
//     const arrayQuote = outputElement.querySelectorAll('span')
//     const arrayValue = codeInputElement.value.split('')

//     let correct = true
//     arrayQuote.forEach((characterSpan, index) => {
//         const character = arrayValue[index]
//         if (character == null) {
//             characterSpan.classList.remove('correct')
//             characterSpan.classList.remove('correct')
//             correct = false
//         } else if (character === characterSpan.innerText) {
//             characterSpan.classList.add('correct')
//             characterSpan.classList.remove('incorrect')
//         } else {
//             characterSpan.classList.add('incorrect')
//             characterSpan.classList.remove('correct')
//             correct = false
//         }
// })

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
}