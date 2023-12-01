// Globala variabler

 // Array: med spelets alla ord
let wordToGuess;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

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

const wordList = ["Elefant", "Ugglor", "Fåtölj", "Ballong", "Fönster", "Mamma", "Papper", "Frukost", "Skratta", "Sköldpadda"];
document.addEventListener('DOMContentLoaded', function () {
    const startGameBtn = document.getElementById('startGameBtn');// DOM-nod: knappen som du startar spelet med
    const gameBoard = document.getElementById('gameBoard');

    // Function to start the game
    function startGame() {
        // Show the gameBoard section
        gameBoard.style.display = 'block';
        wordToGuess = generateRandomWord();
        createLetterBoxes(wordToGuess);
        this.disabled = true;
        // console.log(generateRandomWord());
    }
    // Attach the function to the button's click event
    startGameBtn.addEventListener('click', startGame);
});

// A function to generate the word randomly, that will be called by the startGame button 
function generateRandomWord() {
    return wordList[(Math.floor(Math.random() * wordList.length))];
}

// A function to create boxes for the letter to guess (number of boxes = wordToGuess.length)
function createLetterBoxes() {
    let numberLetters = wordToGuess.length;
    let letterBoxes = document.getElementById("letterBoxes");
    letterBoxes.innerHTML = "";
    for(let i = 0; i < numberLetters; i ++){
        let input = document.createElement("input");
        letterBoxes.appendChild(input);
      }
}

// When click on a letter button => event
const button = document.querySelector("#letterButtons");

letterButtons.addEventListener("click", (event) => {
    const clickedElement = event.target; // to focus on one letter only

    if (clickedElement.tagName === 'BUTTON') {
        const buttonValue = clickedElement.value; // to focus on the value of the letter
        compareLetters(buttonValue);
        clickedElement.disabled = true; // Disable the clicked button
    }
});

// function that compare the letter selected with the letters from the wordToGuess

function compareLetters(buttonValue) {
    for (let i = 0; i < wordToGuess.length; i++) {
        // if the (swedish) letter clicked and some (swedish) letters in the word match
        if (buttonValue.toLocaleUpperCase('sv-SE') === wordToGuess[i].toLocaleUpperCase('sv-SE')) {
            // then display this (or these) letter(s) in letterBoxes children input
            letterBoxes.children[i].value = buttonValue;
        }
    }
    a();
}

// max 5 guesses, I first tested it on the letterButtons id, but it disturbs the "clickedElement.disabled" so I tried with "btn--stripe" and its
let counter = 1;

function a(){
    if(counter >= 5) {
        document.getElementsByClassName("btn--stripe");
        console.log("STOP");
    }
    document.getElementsByClassName("btn--stripe").innerHTML += "";

    counter++
}