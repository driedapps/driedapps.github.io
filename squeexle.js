//import the squeextionary
import { vods } from '/squeextionary.js';
 
//initialize variables for tracking game progress and other stuff
let currentVodIndex = 0;
let score = 0;
let shuffledVods = [...vods];
const vod = shuffledVods[currentVodIndex];
const vod_year = String(vod.voddate.slice(-4))
const vod_month =String(vod.voddate.slice(0,2))
const vod_day = String(vod.voddate.slice(3,5))
const vod_game = String(vod.game)

//function to shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i >0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//function to shuffle the 'shuffledVods' array
function shuffleVods() {
    shuffleArray(shuffledVods)
}

// function to load and display a vods and its options
function loadVod() {
    if (currentVodIndex < shuffledVods.length) {
        document.getElementById('vod').src = vod.filepath;
        document.getElementById('hint').innerHTML = `<strong>Year: ${vod_year}`
        };   
    }

//guess date of vod
const dateInput = document.getElementById("date");

document.getElementById("guess_date").onclick = function() {guessDate()};

function guessDate() {
    const selectedDate = dateInput.value;
    const input_year = selectedDate.slice(0,4);

    console.log("Selected Date:", input_year);
    if (input_year === vod_year) {
        console.log("The strings are equal.");
      } else {
        console.log("The strings are not equal.");
     };
}

//guess game
const gameInput = document.getElementById("game_input");

document.getElementById("guess_game").onclick = function() {guessGame()};

function guessGame() {
    console.log(gameInput.value)
}





// const strdate = selectedDate.toDateString();
// const input_year = strdate.slice(-4);
//need to get the month some other way because js has it as Dec

//check if input and vod are equal





// const input_month = strdate.slice(0,2);
// const input_day = strdate.slice(3,5);


function startGame() {
     currentVodIndex = 0;
     score = 0;
     document.getElementById('score').textContent = 'Tries: 0';
     document.getElementById('hint').textContent = '';
     document.getElementById('vod').style.display = 'block';
     document.getElementById('options').style.display = 'block';
     document.getElementById('try-again').style.display = 'none';

     shuffleVods();
     loadVod();
}

function endGame() {
    const scoreText = `Tries: ${score}`;
    document.getElementById('hint').textContent = 'Game Over!';
    document.getElementById('score').textContent = scoreText;
    document.getElementById('vod').textContent = 'none';
    document.getElementById('play-again').style.display = 'block';
}

//funciton to try again ---- just repeat start game? loadVod()

//initialize game on load
shuffleVods();
loadVod();

    
