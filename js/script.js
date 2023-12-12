
// Globala variabler

let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "å", "ä", "ö"];
const wordList = ["Elefant", "Ugglor", "Fåtölj", "Ballong", "Fönster", "Mamma", "Papper", "Frukost", "Skratta", "Sköldpadda"]; // Array: with all the words of the game
let wordToGuess;    // String: one of the words chosen by a random generator from the array above
let guesses = 0;     // Number: holds the number of guesses made
let incorrectGuessCounter = 0; // Number: holds the number of incorrect guesses made
let hangmanImg;      // String: path to image that will be displayed for each wrong answer, for example `/images/h1.png`

// DOM Elements for Game Initialization

const startGameBtn = document.getElementById('startGameBtn');// DOM-nod: knappen som du startar spelet med
const gameBoard = document.getElementById('gameBoard');
const letterButtonsContainer = document.getElementById('letterButtons');
const letterBoxes = document.getElementById("letterBoxes");
const hintButton = document.getElementById("hintButton");
const restartGameBtn = document.getElementById('restartGameBtn');


// Function that starts the game when a button is pressed and call other functions

document.addEventListener('DOMContentLoaded', function (){

    function startGame() {

        gameBoard.style.display = 'block'; // Show the gameBoard section
        wordToGuess = generateRandomWord(); // Then generate a random word from the array 
        console.log(wordToGuess); // to help the developer test it
        createLetterBoxes(wordToGuess); // Create the empty boxes
        this.disabled = true; // startButton disabled
    }

    createLetterButtons();
    letterButtonEls = document.querySelectorAll('#letterButtons button');
    startGameBtn.addEventListener('click', startGame); // To attach the function to the button's click event
});

// This function will create buttons for each letter of the alphabet

function createLetterButtons() {

    for (let i = 0; i < alphabet.length; i++) {
        const button = document.createElement('button'); // We create a button and and we add attributes to it one by one
        button.className = 'btn btn--stripe';
        button.type = 'button';
        button.value = alphabet[i];
        button.textContent = alphabet[i];

        // Then we attach a click event listener to each button: when click => take the value and give it to the compareLetters function => then disable it
        button.addEventListener('click', function () {
            const buttonValue = this.value;
            compareLetters(buttonValue);
            this.disabled = true;
        });

        // To append the button to the container
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
    letterBoxes.innerHTML = "";
    for(let i = 0; i < numberLetters; i ++){
        let input = document.createElement("input");
        letterBoxes.appendChild(input);
      }
}

// This function will compare the letter selected with the letters from the wordToGuess

function compareLetters(buttonValue) {
    let foundMatch = false;

    for (let i = 0; i < wordToGuess.length; i++) {
        if (buttonValue.toLocaleUpperCase('sv-SE') === wordToGuess[i].toLocaleUpperCase('sv-SE')) {
            letterBoxes.children[i].value = buttonValue.toUpperCase();            ;
            foundMatch = true;
        }
    }

    // Check if the word is completed after each letter guess using areAllLetterBoxesFilled(), and if it's filled then disable the letter and message 
    if (areAllLetterBoxesFilled()) {
        document.getElementById('message').innerHTML = 'You win!';
        document.getElementById("happy").innerHTML = ""; 
        let happymanImg = document.createElement("img"); 
        happymanImg.setAttribute("src", `images/win-notHangman.gif`); 
        document.getElementById("happy").appendChild(happymanImg); 
        disableAll();
        return;  // To stop after winning
    }

    // If the letter clicked doesn't match with any letter of the wordToGuess => add one incorrect guess to the counter + call the updateHangmanImage() + then (second if) check how many incorrect guesses has been made
    if (!foundMatch) {
        incorrectGuessCounter++;
        updateHangmanImage(incorrectGuessCounter);

        // If the counter is equal or superior to six, then message + disable all the letters 
        if (incorrectGuessCounter >= 6) {
            document.getElementById('message').innerHTML = "You lost!"; // Message to show
            disableAll(); // Disable all the leter to stop the game

            const letterBoxesChildren = document.getElementById("letterBoxes").children; // to show the word that hasn't been guessed
            for (let i = 0; i < wordToGuess.length; i++) {
                letterBoxesChildren[i].value = wordToGuess[i].toUpperCase();
            }
        }
    }
}

// This function will change the image according to the incorrectGuessCounter

function updateHangmanImage(counter) {
    
    document.getElementById("hangman").innerHTML = ""; // First remove previous hangman image
    let hangmanImg = document.createElement("img"); // Create a new hangman image element
    hangmanImg.setAttribute("src", `images/h${counter}.png`); // Taking the picture corresponding to the number
    document.getElementById("hangman").appendChild(hangmanImg); // Append the new hangman image to the hangman container
}

// To check if we found all the correct letters of the word (This function is used inside the compareLetters function)

function areAllLetterBoxesFilled() {
    let letterBoxes = document.getElementById("letterBoxes").children;

    for (let i = 0; i < letterBoxes.length; i++) {
        if (letterBoxes[i].value.trim() === "") {
            return false; // At least one letter box is empty
        }
    }

    return true; // All letter boxes are filled
}

// Restart the game

// Add event listener to the button
restartGameBtn.addEventListener('click', restartGame);

// Then this function will reset all the parameters of the game, enable the letters and recreate the letter boxes
function restartGame() {
    guesses = 0;
    incorrectGuessCounter = 0;
    hangmanImg = "";
    document.getElementById("hangman").innerHTML = "";
    document.getElementById("happy").innerHTML = "";
    document.getElementById('message').innerHTML = '';
    
    enableLetterButtons(); // Enable all letter buttons

    wordToGuess = generateRandomWord(); // Generate a new word
    console.log(wordToGuess);

    createLetterBoxes(); // Create new letter boxes
}

// Function to enable all letter buttons

function enableLetterButtons() {
    const buttons = Array.from(letterButtonEls);
    for (let button of buttons) {
        button.disabled = false;
    }
}

// Function to disable all letter buttons

function disableAll() {
    const buttons = Array.from(letterButtonEls);
    for (let button of buttons) {
        button.disabled = true;
    }
}

// This function will handle keyboard input (bonus)

function handleKeyPress(event) {
    const keyboardLetterPressed = event.key.toLowerCase();

    // Check if the pressed key is a letter in the alphabet
    if (alphabet.includes(keyboardLetterPressed)) {
        const correspondingButton = document.querySelector(`#letterButtons button[value="${keyboardLetterPressed}"]`); // Find the corresponding button and simulate a click event
        if (correspondingButton && !correspondingButton.disabled) {
            correspondingButton.click();
        }
    }
}

// I added an event listener to the document to capture keyboard input
document.addEventListener('keydown', handleKeyPress);


