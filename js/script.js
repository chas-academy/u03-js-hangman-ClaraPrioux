// Globala variabler
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "å", "ä", "ö"];
 // Array: med spelets alla ord
let wordToGuess;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let incorrectGuessCounter = 0;
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över

 // Array av DOM-noder: Knapparna för bokstäverna
    // Array av DOM-noder: Rutorna där bokstäverna ska stå
const startGameBtn = document.getElementById('startGameBtn');// DOM-nod: knappen som du startar spelet med
const gameBoard = document.getElementById('gameBoard');
const letterButtonsContainer = document.getElementById('letterButtons');

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
const wordList = ["Elefant", "Ugglor", "Fåtölj", "Ballong", "Fönster", "Mamma", "Papper", "Frukost", "Skratta", "Sköldpadda"];
document.addEventListener('DOMContentLoaded', function (){
    createLetterButtons();
    letterButtonEls = document.querySelectorAll('#letterButtons button');
    // Function to start the game
    function startGame() {
        // Show the gameBoard section
        gameBoard.style.display = 'block';
        wordToGuess = generateRandomWord();
        console.log(wordToGuess);
        createLetterBoxes(wordToGuess);
        this.disabled = true;
        // console.log(generateRandomWord());
    }
    // Attach the function to the button's click event
    startGameBtn.addEventListener('click', startGame);
});

function createLetterButtons() {
    for (let i = 0; i < alphabet.length; i++) {
        const button = document.createElement('button');
        button.className = 'btn btn--stripe';
        button.type = 'button';
        button.value = alphabet[i];
        button.textContent = alphabet[i];

        // Attach a click event listener to each button
        button.addEventListener('click', function () {
            const buttonValue = this.value;
            compareLetters(buttonValue);
            this.disabled = true;
        });

        // Append the button to the container
        letterButtonsContainer.appendChild(button);
    }
}

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

// function that compare the letter selected with the letters from the wordToGuess

function compareLetters(buttonValue) {
    let foundMatch = false;

    for (let i = 0; i < wordToGuess.length; i++) {
        if (buttonValue.toLocaleUpperCase('sv-SE') === wordToGuess[i].toLocaleUpperCase('sv-SE')) {
            letterBoxes.children[i].value = buttonValue;
            foundMatch = true;
        }
    }

    // Check if the word is completed after each letter guess
    if (areAllLetterBoxesFilled()) {
        document.getElementById('message').innerHTML = 'You win!';
        disableAll();
        return;  // Stop further execution after winning
    }

    if (!foundMatch) {
        incorrectGuessCounter++;
        updateHangmanImage(incorrectGuessCounter);

        // Check if the player has lost after processing all incorrect guesses
        if (incorrectGuessCounter >= 6) {
            document.getElementById('message').innerHTML = 'You lost!';
            disableAll();
        }
    }
}

function updateHangmanImage(counter) {
    // Remove any existing child elements (previous hangman images)
    document.getElementById("hangman").innerHTML = "";

    // Create a new hangman image element
    let hangmanImg = document.createElement("img");
    hangmanImg.setAttribute("src", `images/h${counter}.png`);

    // Append the new hangman image to the hangman container
    document.getElementById("hangman").appendChild(hangmanImg);
}

// if we found all the correct letters

function areAllLetterBoxesFilled() {
    let letterBoxes = document.getElementById("letterBoxes").children;

    for (let i = 0; i < letterBoxes.length; i++) {
        if (letterBoxes[i].value.trim() === "") {
            return false; // At least one letter box is empty
        }
    }

    return true; // All letter boxes are filled
}

function restartGame() {
    // Reset variables
    guesses = 0;
    incorrectGuessCounter = 0;
    hangmanImg = "";

    // Remove hangman image
    document.getElementById("hangman").innerHTML = "";

    // Enable all letter buttons
    enableLetterButtons();

    // Generate a new word
    wordToGuess = generateRandomWord();
    console.log(wordToGuess);

    // Create new letter boxes
    createLetterBoxes();

    // Reset game state message
    document.getElementById('message').innerHTML = '';
}

// Add event listener to the restart button
const restartGameBtn = document.getElementById('restartGameBtn');
restartGameBtn.addEventListener('click', restartGame);

// Function to enable all letter buttons
function enableLetterButtons() {
    const buttons = Array.from(letterButtonEls);
    for (let button of buttons) {
        button.disabled = false;
    }
}

function disableAll() {
    const buttons = Array.from(letterButtonEls);
    for (let button of buttons) {
        button.disabled = true;
    }
}
  