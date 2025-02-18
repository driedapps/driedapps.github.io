// defining constants to reference later
import { vods } from '/data/squeextionary.js';

const games = [
    // list of games to select from (add auto suggestion)
    "UFO 50",
    "Super Mario 64",
    "Rocket League",

]

const stats = {
    totalDateTries: 0,
    totalGameTries: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    currentStreak: 0,
    maxStreak: 0
}

const vod = vods[0];
const vodDate = new Date(vod.voddate)
const vodYear = vodDate.getFullYear()
const vodMonth = vodDate.getMonth() + 1
const vodDay = vodDate.getDate()
const vodGame = vod.game

let currentTries = 0;
const maxTries = 6;

const dateWinModal = new bootstrap.Modal(document.getElementById('dateWinner'));
const dateWinBody = document.getElementById('dateWinnerBody');

console.log(vodYear, vodMonth, vodDay, vodGame)

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("guessDate").addEventListener("click touchstart", function() {
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
                        listGroup.className = 'list-group list-group-horizontal-sm justify-content-center';

                        let monthDiff = Math.abs(month - vodMonth);
                        if (monthDiff > 6) {
                            monthDiff = 12 - monthDiff; // Take the shortest distance
                        }
                        if (monthDiff === 0) {
                            let monthItem = document.createElement('li');
                            monthItem.className = 'list-group-item list-group-item-success';
                            monthItem.style = "font-size: large; font-weight: bold;"
                            monthItem.textContent = `${month}`;
                            listGroup.appendChild(monthItem);
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
                        
                        listContainer.appendChild(listGroup);
                        dateInput.value = '';
                        currentTries++;

                        if (yearDiff===0 && monthDiff===0 && dayDiff===0) {
                            // NEED TO ADD GAME STATE = WON
                            // ALSO NEED to add this win into the stats
                            
                            document.getElementById('dateInput').disabled = true;
                            document.getElementById('guessDate').disabled = true;
                            triggerGameGuess();
                            if (currentTries === 1) {
                                dateWinBody.innerHTML = `<center><h2>Wow!!</h2>You got the whole date right in one guess!
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
                    document.getElementById('dateInput').disabled = true;
                    document.getElementById('guessDate').disabled = true;
                    document.getElementById('winnersMessage').className = "text-center p-2 fs-4";
                    document.getElementById('winnersMessage').innerHTML = `Oh... you've reached the max number of guesses for today.<br>Try again tomorrow...`;
                    document.getElementById('winnersMessage').className = "text-center";
            }
                }

                }
            else {
                    console.warn("No date entered");
                }

        });
}); 

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

const acResults = document.getElementById('ac-results');

gameInput.addEventListener('input', function () {
    const inputValue = this.value.toLowerCase();
    acResults.innerHTML = '';

    if (inputValue.length === 0) {
        acResults.classList.add('d-none');
        return;
    }

    const filteredGames = games.filter(game => 
        game.toLowerCase().includes(inputValue)
    );

    if (filteredGames.length > 0) {
        filteredGames.forEach(game => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = game;
            div.addEventListener('click', function () {
                gameInput.value = game;
                acResults.classList.add('d-none');
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