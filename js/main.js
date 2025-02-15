// defining constants to reference later
import { vods } from '/data/squeextionary.js';

const dateGuessLimit = 6

const gameList = [
    // list of games to select from (add auto suggestion)
    "UFO 50",
    "Super Mario 64",
    "Rocket League",

]

const vod = vods[0];
const vodDate = new Date(vod.voddate)
const vodYear = vodDate.getFullYear()
const vodMonth = vodDate.getMonth() + 1
const vodDay = vodDate.getDate()
const vodGame = vod.game

console.log(vodYear, vodMonth, vodDay, vodGame)


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("guessDate").addEventListener("click", function() {
            console.log("date guessed");
            let dateInput = document.getElementById('dateInput');
            let dateValue = dateInput.value;

            if (dateValue) {
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
            }
            else {
                    console.warn("No date entered");
                }
            
        });
});


// next step: change console log to list output,
// then have dynamic output based on the person's guess