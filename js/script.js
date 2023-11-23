// Globala variabler

const wordList = ["Elefant", "Ugglor", "Fåtölj", "Ballong", "Fönster", "Mamma", "Papper", "Frukost", "Skratta", "Sköldpadda"]; // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över

let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som slumpar fram ett ord
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

// function pickUp() {
//     return wordList[(Math.floor(Math.random() * wordList.length))];
// }
// console.log(pickUp());

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner


document.addEventListener('DOMContentLoaded', function () {
    const startGameBtn = document.getElementById('startGameBtn');// DOM-nod: knappen som du startar spelet med
    const gameBoard = document.getElementById('gameBoard');

    // Function to start the game
    function startGame() {
        // Show the gameBoard section
        gameBoard.style.display = 'block';
        generateRandomWord();
        // console.log(generateRandomWord());
    }
    // Attach the function to the button's click event
    startGameBtn.addEventListener('click', startGame);
});

// A function to generate the word randomly, that will be called by the startGame button 
function generateRandomWord() {
    let wordToGuess = wordList[(Math.floor(Math.random() * wordList.length))];
    createLetterBoxes(wordToGuess);
    return wordToGuess;
}

function createLetterBoxes(wordInBoxes) {
    numberLetters = wordInBoxes.length;
    console.log(numberLetters);
    for(let i = 0; i < createLetterBoxes; i ++){
        // CONTINUE HERE
      }
}
