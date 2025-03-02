// defining constants to reference later
import { vods } from '/data/squeextionary.js';

// list of games to select from (add auto suggestion)
const games = [
    "At Dead of Night",
    "Counter-Strike",
    "DARK SOULS 3",
    "Elden Ring",
    "Fall Guys",
    "Fortnite",
    "God of War",
    "Kirby and the Forgotten Land",
    "LEGO Star Wars: The Skywalker Saga Part 4",
    "Luigis Mansion",
    "Rocket League",
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

    // Generate a random number between 1 and 100 (or any range you prefer)
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

function removeZeroes(str) {
    return str.replace(/^0+(?=\d)/, '');
}

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
const vodsLength = vods.length

document.getElementById("vod").src = `/data/${vodImgPath}`;

let currentTries = 0;
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

function handleGuessDate() {
            console.log("date guessed");
            let dateInput = document.getElementById('dateInput');
            let dateValue = dateInput.value;


            if (dateValue) {
                for (let i = 0; i < 1; i++) {
                    if (currentTries < maxTries) {
                        let date = new Date(dateValue);
                        
                        let month = date.getUTCMonth() + 1
                        let day = date.getUTCDate()
                        let year = date.getUTCFullYear()

                        let listContainer = document.getElementById('dateListContainer');
                        listContainer.style.display = 'block';
                        
                        let listGroup = document.createElement('ul');
                        listGroup.className = 'list-group list-group-horizontal list-group-horizontal-sm justify-content-center';

                        let monthDiff = Math.abs(month - vodMonth);
                        if (monthDiff > 6) {
                            monthDiff = 12 - monthDiff; // Take the shortest distance
                        }
                        if (monthDiff === 0) {
                            let monthItem = document.createElement('li');
                            monthItem.className = 'list-group-item list-group-item-success';
                            monthItem.style = "font-size: large; font-weight: bold;"
                            monthItem.textContent = `${month}`;
                            listGroup.insertBefore(monthItem, listGroup.children[0]);
                        } else if (monthDiff >=1 && monthDiff <=2) {
                            let monthItem = document.createElement('li');
                            monthItem.className = 'list-group-item list-group-item-warning';
                            monthItem.textContent = `${month}`;
                            listGroup.appendChild(monthItem);
                        } else if (monthDiff >2 && monthDiff <5) {
                            let monthItem = document.createElement('li');
                            monthItem.className = 'list-group-item list-group-item-danger';
                            monthItem.textContent = `${month}`;
                            listGroup.appendChild(monthItem);
                        } else if (monthDiff >=5) {
                            let monthItem = document.createElement('li');
                            monthItem.className = 'list-group-item list-group-item-dark';
                            monthItem.style = "font-weight: bold;"
                            monthItem.textContent = `${month}`;
                            listGroup.appendChild(monthItem);
                        }
                        
                        let dayDiff = Math.abs(day - vodDay);

                        if (dayDiff === 0) {
                            let dayItem = document.createElement('li');
                            dayItem.className = 'list-group-item list-group-item-success';
                            dayItem.style = "font-size: large; font-weight: bold;"
                            dayItem.textContent = `${day}`;
                            listGroup.appendChild(dayItem);
                        } else if (dayDiff >=1 && dayDiff <=3) {
                            let dayItem = document.createElement('li');
                            dayItem.className = 'list-group-item list-group-item-warning';
                            dayItem.textContent = `${day}`;
                            listGroup.appendChild(dayItem);
                        } else if (dayDiff >3 && dayDiff <8) {
                            let dayItem = document.createElement('li');
                            dayItem.className = 'list-group-item list-group-item-danger';
                            dayItem.textContent = `${day}`;
                            listGroup.appendChild(dayItem);
                        } else if (dayDiff >=8) {
                            let dayItem = document.createElement('li');
                            dayItem.className = 'list-group-item list-group-item-dark';
                            dayItem.style = "font-weight: bold;"
                            dayItem.textContent = `${day}`;
                            listGroup.appendChild(dayItem);
                        }
                        
                        let yearDiff = Math.abs(year - vodYear);

                        if (yearDiff === 0) {
                            let yearItem = document.createElement('li');
                            yearItem.className = 'list-group-item list-group-item-success';
                            yearItem.style = "font-size: large; font-weight: bold;"
                            yearItem.textContent = `${year}`;
                            listGroup.appendChild(yearItem);
                        } else if (yearDiff >=1 && yearDiff <=2) {
                            let yearItem = document.createElement('li');
                            yearItem.className = 'list-group-item list-group-item-warning';
                            yearItem.textContent = `${year}`;
                            listGroup.appendChild(yearItem);
                        } else if (yearDiff >2 && yearDiff <5) {
                            let yearItem = document.createElement('li');
                            yearItem.className = 'list-group-item list-group-item-danger';
                            yearItem.textContent = `${year}`;
                            listGroup.appendChild(yearItem);
                        } else if (yearDiff >=5) {
                            let yearItem = document.createElement('li');
                            yearItem.className = 'list-group-item list-group-item-dark';
                            yearItem.style = "font-weight: bold;"
                            yearItem.textContent = `${year}`;
                            listGroup.appendChild(yearItem);
                        }
                        
                        listContainer.insertBefore(listGroup, listContainer.children[0]);
                        dateInput.value = '';
                        currentTries++;

                        if (yearDiff===0 && monthDiff===0 && dayDiff===0) {
                            // NEED TO ADD GAME STATE = WON
                            // ALSO NEED to add this win into the stats
                            
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

                }
            else {
                    console.warn("No date entered");
                }

        }

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
                                                    <a href="${vodLink}" target="_blank">Click here to watch the VOD</a><br><span class="small">blame Twitch if this link doesn't work...</span></center>`;
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