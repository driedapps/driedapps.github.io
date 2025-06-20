// defining constants to reference later
import { vods } from '/data/squeextionary.js';



// list of games to select from (add auto suggestion)
const games = [
    "At Dead of Night",
    "Counter-Strike",
    "DARK SOULS 3",
    "Deadlock",
    "Elden Ring",
    "Fall Guys",
    "Fortnite",
    "God of War",
    'Grand Theft Auto IV',
    'Grand Theft Auto V',
    "Just Chatting",
    "Kirby and the Forgotten Land",
    "LEGO Star Wars: The Skywalker Saga Part 4",
    "Luigis Mansion",
    "Rocket League",
    "Spectre Divide",
    "Shawarma Legends",
    "Super Mario 64",
    "Super Mario Sunshine",
    "Super Monkey Ball: Banana Mania",
    "The Long Drive",
    "The Sims 4",
    "The Stanley Parable: Ultra Deluxe",
    "UFO 50",
    "Valorant"
]

let userStats = JSON.parse(localStorage.getItem("stats")) || {
    numGames: 0,
    numWins: 0,
    numOfGuesses: [0, 0, 0, 0, 0, 0],
    currentStreak: 0,
    maxStreak: 0,
};

// Get the current date as a seed (e.g., "2023-10-05")
let today = new Date();


// Format the date as a string (e.g., "YYYY-MM-DD")
const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const todayDay = String(today.getDate()).padStart(2, '0');

const todayString = `${todayYear}-${todayMonth}-${todayDay}`;

console.log('today is:', todayString)

/// SET TODAY TO TOMORROW FOR DEBUGGING
// today.setDate(today.getDate() + 1);

// Function to generate a seeded random number
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Function to generate a unique random number for the day
function generateDailyRandomNumber() {
    
    // use below for debugging
    // const today = "2025-03-03"
    const seed = todayString.split('-').join(''); // Convert to a number-like seed

    // Generate a random number between 1 and length of vods
    const randomNumber = Math.floor(seededRandom(seed) * vods.length);

    return randomNumber;
}

// Function to ensure the number is unique and not repeated
function getUniqueDailyNumber() {
    // Retrieve the list of previously generated numbers from localStorage
    const storedNumbers = JSON.parse(localStorage.getItem('dailyNumbers')) || [];

    // Generate today's number
    const dailyNumber = generateDailyRandomNumber();

    // Check if the number has already been used
    if (storedNumbers.includes(dailyNumber)) {
        localStorage.removeItem('dailyNumbers'); // Reset the list if all numbers are used
        return getUniqueDailyNumber(); // Retry after resetting
    }

    // Store the new number in the list
    storedNumbers.push(dailyNumber);
    localStorage.setItem('dailyNumbers', JSON.stringify(storedNumbers));

    return dailyNumber;
}

// Example usage
const uniqueNumber = getUniqueDailyNumber();
// console.log("Today's unique number:", uniqueNumber);


// const vod = vods[8];
const vod = vods[uniqueNumber];
const vodDate_ = vod.voddate
var [vmonth, vday, vyear] = vodDate_.split('-');

const vodDate = new Date(vyear, vmonth - 1, vday); // Note: Month is 0-indexed in JavaScript

const vodYear = vodDate.getFullYear()
const vodMonth = vodDate.getMonth() + 1
const vodDay = vodDate.getDate()
const vodGame = vod.game
const vodLink = vod.vodlink
const vodImgPath = vod.filepath

document.getElementById("vod").src = `/data/${vodImgPath}`;

let currentTries = localStorage.getItem('currentTries') || 0;
const maxTries = 6;

const dateWinModal = new bootstrap.Modal(document.getElementById('dateWinner'));
const dateWinBody = document.getElementById('dateWinnerBody');
const dateLoseModal = new bootstrap.Modal(document.getElementById('dateLoser'));
const dateLoseBody = document.getElementById('dateLoserBody');
const gameWinnerModal = new bootstrap.Modal(document.getElementById('gameWinner'));
const gameWinnerBody = document.getElementById('gameWinnerBody');

// let today = new Date();

console.log("oh you're a nerd? here are the answers:", vodYear, vodMonth, vodDay, vodGame)


document.addEventListener("DOMContentLoaded", function() {
    var guessDateButton = document.getElementById("guessDate");

    // Add event listeners for both click and touch events
    guessDateButton.addEventListener("pointerdown", handleGuessDate);
    guessDateButton.addEventListener('touchstart', handleGuessDate);

});

window.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
    e.preventDefault();
    handleGuessDate();
    }
   }, false);

function handleGuessDate() {
    console.log("date guessed");

    let dateInput = document.getElementById('dateInput');
    let dateValue = dateInput.value;

    if (dateValue) {
        for (let i = 0; i < 1; i++) {
            if (currentTries < maxTries) {
                let date = new Date(dateValue);
                
                let month = date.getUTCMonth() + 1;
                let day = date.getUTCDate();
                let year = date.getUTCFullYear();

                // Create a guess object
                let guess = {
                    month: month,
                    day: day,
                    year: year,
                    monthDiff: Math.abs(month - vodMonth),
                    dayDiff: Math.abs(day - vodDay),
                    yearDiff: Math.abs(year - vodYear)
                };

                // Save the guess to localStorage
                saveGuess(guess);

                // Render the guess
                renderGuess(guess);

                dateInput.value = '';
                currentTries++;
                localStorage.setItem('currentTries', currentTries);
                localStorage.setItem('lastPlayedDate', todayString);
                localStorage.setItem('gameStatus', 'didntfinish');
                showStats();

                if (guess.yearDiff === 0 && guess.monthDiff === 0 && guess.dayDiff === 0) {
                    // Store the WIN in localStorage
                    localStorage.setItem('gameStatus', 'won');

                    localStorage.setItem('lastPlayedDate', todayString); 
                    userStats.currentStreak++;
                    userStats.numWins++;
                    userStats.numGames++;
                    userStats.numOfGuesses[currentTries - 1]++;
                    localStorage.setItem("stats", JSON.stringify(userStats));
                    showStats();

                    document.getElementById('dateInput').disabled = true;
                    document.getElementById('guessDate').disabled = true;
                    triggerGameGuess();
                    if (currentTries === 1) {
                        dateWinBody.innerHTML = `<center><h2>Wow!!</h2>You got the whole date right in only one guess!
                                        <br><br>Now you can guess which game is being played!</center>`;
                        dateWinModal.show();                                
                    } else if (currentTries > 1) {
                        dateWinBody.innerHTML = `<center>You got the whole date right in ${currentTries} guesses!!
                                        <br><br>Now you can guess which game is being played!</center>`;
                        dateWinModal.show();
                    }
                }
            }
            if ((JSON.parse(localStorage.getItem('currentTries')) === 6 & (guess.yearDiff != 0 && guess.monthDiff != 0 && guess.dayDiff != 0))) {
                userStats.numGames++;
                userStats.currentStreak = 0;
                localStorage.setItem("stats", JSON.stringify(userStats));
                localStorage.setItem('lastPlayedDate', todayString); 
                localStorage.setItem('gameStatus', 'lost');
                dateLoseBody.innerHTML = `<center>You've reached the maximum number of guesses for today...<br><br>
                                            Try again tomorrow?</center>`;
                dateLoseModal.show();
                document.getElementById('dateInput').disabled = true;
                document.getElementById('guessDate').disabled = true;
                showStats();
            }
        }
    } else {
        console.warn("No date entered");
    }
}


// Function to save guess to localStorage
function saveGuess(guess) {
    let guesses = JSON.parse(localStorage.getItem('guesses')) || [];
    guesses.push(guess);
    localStorage.setItem('guesses', JSON.stringify(guesses));
}

// Function to render a guess
function renderGuess(guess) {
    let listContainer = document.getElementById('dateListContainer');
    listContainer.style.display = 'block';
    
    let listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-horizontal list-group-horizontal-sm justify-content-center';

    // Render month
    let monthItem = document.createElement('li');
    monthItem.className = getClassForDiff(guess.monthDiff, 'month');
    monthItem.textContent = `${guess.month}`;
    listGroup.appendChild(monthItem);

    // Render day
    let dayItem = document.createElement('li');
    dayItem.className = getClassForDiff(guess.dayDiff, 'day');
    dayItem.textContent = `${guess.day}`;
    listGroup.appendChild(dayItem);

    // Render year
    let yearItem = document.createElement('li');
    yearItem.className = getClassForDiff(guess.yearDiff, 'year');
    yearItem.textContent = `${guess.year}`;
    listGroup.appendChild(yearItem);

    listContainer.insertBefore(listGroup, listContainer.children[0]);
}

// Function to get the appropriate class based on the difference
function getClassForDiff(diff, type) {
    if (diff === 0) {
        return `list-group-item list-group-item-success ${type}`;
    }
    
    if (type === 'year') {
        if (diff === 1) {
            return `list-group-item list-group-item-warning ${type}`;
        } else if (diff > 1 && diff < 3) {
            return `list-group-item list-group-item-danger ${type}`;
        } else {
            return `list-group-item list-group-item-dark ${type}`;
        }
    } else if (type === 'day') {
        if (diff >= 1 && diff < 3) {
            return `list-group-item list-group-item-warning ${type}`;
        } else if (diff >= 3 && diff < 7) {
            return `list-group-item list-group-item-danger ${type}`;
        } else {
            return `list-group-item list-group-item-dark ${type}`;
        }
    } else if (type === 'month') {
        if (diff >= 1 && diff <= 2) {
            return `list-group-item list-group-item-warning ${type}`;
        } else if (diff > 2 && diff < 5) {
            return `list-group-item list-group-item-danger ${type}`;
        } else {
            return `list-group-item list-group-item-dark ${type}`;
        }
    }
};

// Subtract one day to get yesterday's date
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
// Format the date as a string (e.g., "YYYY-MM-DD")
const year = yesterday.getFullYear();
const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(yesterday.getDate()).padStart(2, '0');

const yesterdayString = `${year}-${month}-${day}`;

let lastPlayedDate = localStorage.getItem('lastPlayedDate') || 'never';

addPlayDate(lastPlayedDate);

document.addEventListener('DOMContentLoaded', function() {
    showStats();
    loadGuesses();
 
});

let gameStatus = localStorage.getItem('gameStatus')

// check is there is a date stored as last played date, 
// if there is then -- clear guesses and other normal new day behavior
function addPlayDate(lastPlayedDate) {
    const playHistory = JSON.parse(localStorage.getItem('playHistory') || '[]');
    if (!playHistory.includes(lastPlayedDate)) {
        playHistory.push(lastPlayedDate);
        localStorage.setItem('playHistory', JSON.stringify(playHistory));
    }
}

// console.log(JSON.parse(localStorage.getItem('playHistory')))

// Function to load guesses from localStorage and render them
function loadGuesses() {   
    const playDates = JSON.parse(localStorage.getItem('playHistory'));

    if (!playDates.includes(lastPlayedDate)) {
        localStorage.setItem('currentTries', 0);
    }

    // Check if it's a new day
    if (!playDates.includes(todayString)) {
        // Clear guesses for the new day
        localStorage.removeItem('guesses');
        localStorage.setItem('currentTries', 0);
    }
    // Load guesses
    let guesses = JSON.parse(localStorage.getItem('guesses')) || [];
    guesses.forEach(guess => renderGuess(guess));
    
    //show loser modal when they've guessed 6 times
    if (guesses.length >= 6) { 
                dateLoseBody.innerHTML = `<center>You've reached the maximum number of guesses for today...<br><br>
                                            Try again tomorrow?</center>`;
                dateLoseModal.show();
                document.getElementById('dateInput').disabled = true;
                document.getElementById('guessDate').disabled = true;
    }

    // Check if there's a stored win for today
  //  let dateWin = JSON.parse(localStorage.getItem(winKey));
    if (gameStatus == 'won' & lastPlayedDate == todayString) {
        // Disable input and button
        document.getElementById('dateInput').disabled = true;
        document.getElementById('guessDate').disabled = true;
        triggerGameGuess()
}}



// console.log('game status',gameStatus, 'last played date:', lastPlayedDate, 'yesterday', yesterdayString)

const gameInput = document.createElement('input');
const gameButton = document.createElement('button');

function triggerGameGuess() {
    document.getElementById('dateInput').remove();
    document.getElementById('guessDate').remove();
    document.getElementById('dateListContainer').remove();
    
    
    gameInput.type = 'text';
    gameInput.className = 'form-control';
    gameInput.placeholder = 'Start typing for a suggestion...';

    gameButton.type = 'button';
    gameButton.className = "btn btn-dark";
    gameButton.textContent = "guess game";

    document.getElementById('inputDiv').appendChild(gameInput);
    document.getElementById('inputDiv').appendChild(gameButton);
}

// autocomplete container to select a game instead of typing the whole thing out
const acResults = document.getElementById('ac-results');

gameInput.addEventListener('input', function () {
    var gameValue = this.value.toLowerCase();
    acResults.innerHTML = '';

    if (gameValue.length === 0) {
        acResults.classList.add('d-none');
        return;
    }

    const filteredGames = games.filter(game => 
        game.toLowerCase().includes(gameValue)
    );

    if (filteredGames.length > 0) {
        filteredGames.forEach(game => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = game;
            div.addEventListener('click', function () {
                gameInput.value = game
                var gameValue = game;
                acResults.classList.add('d-none');                
                
                gameButton.addEventListener('click', function () {
                    if (gameValue == vodGame) {
                        document.getElementById('modalTitle').innerHTML = `<h3>Congratulations!</h3>`
                        gameWinnerBody.innerHTML = `<center>You got the game correct!!!<br>Thanks for playing :)<br><br>
                                                    <a href="${vodLink}" target="_blank">Click here to watch!</a></center>`;
                        gameWinnerModal.show();  
                    } else if (gameValue != vodGame.toLowerCase()) {
                        document.getElementById('modalTitle').innerHTML = `<b>Uh oh....</b>`
                        gameWinnerBody.innerHTML = `<center>That is not correct... Try again...</center>`;
                        gameWinnerModal.show();
                    }
                })
            });
            acResults.appendChild(div);

        });
        acResults.classList.remove('d-none');
    } else {
        acResults.classList.add('d-none');
    }

});


// if last played date is only called when you win
// and its a new day, we want the old guesses to go away if you didnt finish and if you did
// so dont call last played date until you win
// and then if its a new day when you refresh, call last played date and run loadguesses

function showStats() {
    if (userStats.numGames == 0) {
        var winPercentage = 0;
    } else {
        var winPercentage = Math.round((userStats.numWins / userStats.numGames) * 100)
    }

    document.getElementById('statsBody').innerHTML = `<center><h5><b>guesses today:</b> ${currentTries}<br>
                                                      <b>current win streak:</b> ${userStats.currentStreak}<br>
                                                      <b>win%:</b> ${winPercentage}</h5></center>`;
    graphDistribution();
    if (lastPlayedDate == todayString & gameStatus == 'won') {
        document.getElementById('todayGameStatus').innerHTML = `<center><b>Today, you are a winner!!!</b><br>
                                                                Congrats! Come back tomorrow to find out if you're a winner or loser!
                                                                </center>`
    }
    if (lastPlayedDate == todayString & gameStatus == 'lost') {
        document.getElementById('todayGameStatus').innerHTML = `<center><b>Today, you are a loser..</b><br>
                                                                Too bad! Come back tomorrow to find out if you're a winner or loser!
                                                                </center>`
    }
};

// graph wins, to go in stats modal, taken from costcodle
function graphDistribution() {
    userStats.numOfGuesses.forEach((value, index) => {
      const graphElem = document.getElementById(`graph-${index + 1}`);
      if (userStats.numWins === 0) {
        graphElem.style = `width: 5%`;
      } else {
        graphElem.style = `width: ${
          Math.floor((value / userStats.numWins) * 0.95 * 100) + 5
        }%`;
      }
      graphElem.innerHTML = `${value}`;
    });
}

// Hide autocomplete results when clicking outside
document.addEventListener('click', function (e) {
    if (e.target !== gameInput) {
        acResults.classList.add('d-none');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copyButton').addEventListener('click', async function() {
        try {
            const statsContent = document.getElementById('statsBody').textContent
                .replace(/[^\S\n]+/g, ' ')  // Collapse multiple spaces (except newlines)
                .replace(/\n[^\S\n]+/g, '\n') // Remove spaces after newlines
                .replace(/[^\S\n]+\n/g, '\n') // Remove spaces before newlines
                .replace(/(\n){2,}/g, '\n\n') // Limit consecutive newlines to 2
                .trim();

            const websiteLink = "\n\nhttps://squeexle.com";
            const textToCopy = statsContent + websiteLink;
            
            await navigator.clipboard.writeText(textToCopy);
            
            const originalText = this.innerText;
            this.innerText = 'Copied!';
            setTimeout(() => {
                this.innerText = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy. Please manually select and copy the text.');
        }
    });
});