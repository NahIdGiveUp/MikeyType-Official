const codeInputElement = document.getElementById('code_display')
const codeDisplayElement = document.getElementById('code_input')

async function readTextFile(){
    try{
        const response = await fetch('./fake-code.txt')
        if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);
        }

        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.error('Unable to read the file:', error);
    }
}

codeInputElement.addEventListener('input', () =>{

} )

var lines;
var randomNumber;
var lastRandomNumber;

$(document.body).ready(function () {

  // load the trivia from the server
  $.ajax({
    url: 'trivia.txt'
  }).done(function(content) {

    // normalize the line breaks, then split into lines
    lines = content.replace(/\r\n|\r/g, '\n').trim().split('\n');

    // only set up the click handler if there were lines found
    if (lines && lines.length) {
      $('#showLine').on('click', function () {
        // loop to prevent repeating the last random number
        while (randomNumber === lastRandomNumber) {
          randomNumber = parseInt(Math.random() * lines.length);
          // check to prevent infinite loop
          if (lines.length === 1) { break; }
        }
        // keep track of the last random number
        lastRandomNumber = randomNumber;

        // show the corresponding line
        $('#trivia').text(lines[randomNumber]);
      });
    }
  });
});

readTextFile();