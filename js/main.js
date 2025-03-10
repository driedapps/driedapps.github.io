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

const stats = {
    totalDateTries: 0,
    totalGameTries: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    currentStreak: 0,
    maxStreak: 0
}


const dateInput = document.getElementById("dateInput");

function resetDateInput() {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    dateInput.value = formattedDate;
}

// Function to generate a seeded random number
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Function to generate a unique random number for the day
function generateDailyRandomNumber() {
    // Get the current date as a seed (e.g., "2023-10-05")
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('-').join(''); // Convert to a number-like seed

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
console.log("Today's unique number:", uniqueNumber);


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


console.log(vodDate, vodYear, vodMonth, vodDay, vodGame)

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

function getTodayDateKey() {
    let today = new Date();
    return `dateWin_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function handleGuessDate() {
    const today = new Date();
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

                if (guess.yearDiff === 0 && guess.monthDiff === 0 && guess.dayDiff === 0) {
                    // Store the win in localStorage
                    let todayKey = getTodayDateKey();
                    localStorage.setItem(todayKey, JSON.stringify({
                        tries: currentTries,
                        date: dateValue
                    }));

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
            if (currentTries === 6) {
                dateLoseBody.innerHTML = `<center>You've reached the maximum number of guesses for today...<br><br>
                                            Try again tomorrow?</center>`;
                dateLoseModal.show();
                document.getElementById('dateInput').disabled = true;
                document.getElementById('guessDate').disabled = true;
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
    } else if (diff >= 1 && diff <= (type === 'month' ? 2 : 3)) {
        return `list-group-item list-group-item-warning ${type}`;
    } else if (diff > (type === 'month' ? 2 : 3) && diff < (type === 'month' ? 5 : 8)) {
        return `list-group-item list-group-item-danger ${type}`;
    } else {
        return `list-group-item list-group-item-dark ${type}`;
    }
}

// Function to load guesses from localStorage and render them
function loadGuesses() {
    // Check if it's a new day
    let lastPlayedDate = localStorage.getItem('lastPlayedDate');
    let todayKey = getTodayDateKey();

    if (lastPlayedDate !== todayKey) {
        // Clear guesses for the new day
        localStorage.removeItem('guesses');
        localStorage.setItem('lastPlayedDate', todayKey);
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
    let dateWin = JSON.parse(localStorage.getItem(todayKey));
    if (dateWin) {
        // Disable input and button
        document.getElementById('dateInput').disabled = true;
        document.getElementById('guessDate').disabled = true;
        triggerGameGuess()
}}

// Call loadGuesses when the page loads
window.onload = loadGuesses;

console.log(currentTries)

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
                                                    <a href="${vodLink}" target="_blank">Click here to watch!</a><br><span class="small">blame Twitch if this link doesn't work...</span></center>`;
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


// Hide autocomplete results when clicking outside
document.addEventListener('click', function (e) {
    if (e.target !== gameInput) {
        acResults.classList.add('d-none');
    }
});