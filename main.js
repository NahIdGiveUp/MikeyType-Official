const fileUrl = './fake-code.txt';

fetch(fileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.text();
    })
    .then(data => {
        const lines = data
            .split(/\r?\n/)
            .filter(line => line.trim() !== '');

        const shuffledLines = shuffleArray(lines);
        displayText(shuffledLines);
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

function displayText(lines) {
    const outputElement = document.getElementById('code-display');

    if (!outputElement) {
        throw new Error('Element with id "code-display" was not found.');
    }

    outputElement.textContent = lines.join('\n');
}
