const fileurl = './fake-code.txt';

fetch(fileurl)
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n')
        const shuffledlines = shuffleArray(lines);
        displayText(shuffledlines);
    })
    .catch(error => console.error('Unable to read the file:', error));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function displayText(lines) {
    const outputElement = document.getElementById('code-display');
    outputElement.innerHTML = lines.join('<br>')
}