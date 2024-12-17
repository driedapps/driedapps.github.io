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
const vod_game = vod.game

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

        };   
    }

//guess date of vod
document.getElementById("guess_date").onclick = function() {guessDate()};

// display vod year in game container
// document.getElementById('hint').innerHTML = `<strong>Year: ${vod_year}`

function guessDate() {
    let dateInput = document.getElementById("date").value;
    let selectedDate = dateInput;
    let input_year = selectedDate.slice(0,4);
    let input_month = String(selectedDate.slice(5,7));
    let input_day = String(selectedDate.slice(8,10));

    console.log('input month:', input_month)
    console.log('input dat', input_day)

    let num_inputYear = Number(input_year);
    let num_vodYear = Number(vod_year);
    let yearDiff = Math.abs(num_inputYear - num_vodYear);
    if (yearDiff === 0) {
        document.getElementById('dateHint_year').innerHTML = `You got the year right!`;
    } else if (yearDiff === 1) {
        document.getElementById('dateHint_year').innerHTML = `You are one year away.`;
    } else if (yearDiff > 1) {
        document.getElementById('dateHint_year').innerHTML = `You are ${yearDiff} years away...`;
    }

    let num_inputMonth = Number(input_month);
    let num_vodMonth = Number(vod_month);
    let monthDiff = Math.abs(num_inputMonth - num_vodMonth);
    if (monthDiff === 0) {
        document.getElementById('dateHint_month').innerHTML = `You got the month right!`;
    } else if (monthDiff === 1) {
        document.getElementById('dateHint_month').innerHTML = `You are one month away.`;
    } else if (monthDiff > 1) {
        document.getElementById('dateHint_month').innerHTML = `You are ${monthDiff} months away...`;
    }

    let num_inputDay = Number(input_day);
    let num_vodDay = Number(vod_day);
    let dayDiff = Math.abs(num_inputDay - num_vodDay);
    if (dayDiff === 0) {
        document.getElementById('dateHint_day').innerHTML = `You got the day right!`;
    } else if (dayDiff === 1) {
        document.getElementById('dateHint_day').innerHTML = `You are only one day away.`;
    } else if (dayDiff > 1 && dayDiff < 14) {
        document.getElementById('dateHint_day').innerHTML = `You are ${dayDiff} days away.`;
    } else if (dayDiff > 14) {
        document.getElementById('dateHint_day').innerHTML = `You are more than 2 weeks away...`;
    }
}

//guess game
document.getElementById("guess_game").onclick = function() {guessGame()};

function guessGame() {
    let gameInput = document.getElementById("game_input").value;
    if (vod_game.includes(gameInput)) {
        document.getElementById('game_hint').innerHTML = `You got the game right!`;
      } else {
        document.getElementById('game_hint').innerHTML = `Try again...`;
     };
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

    
