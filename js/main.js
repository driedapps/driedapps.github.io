// defining constants to reference later
const app = {
    consts:{
        dateGuessLimit: 6,
        gameList: [
            // list of games to select from (add auto suggestion)
            "UFO 50",
            "Super Mario 64",
            "Rocket League",

        ],
        html: {
        }
    }
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("guessDate").addEventListener("click", addDate);
});

function addDate() {
    let dateInput = document.getElementById('dateInput');
    let dateValue = dateInput.value;

    if (dateValue) {
        let date = new Date(dateValue);
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        
        let listContainer = document.getElementById('dateListContainer');
        
        let listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-horizontal-sm justify-content-center';
        
        let monthItem = document.createElement('li');
        monthItem.className = 'list-group-item';
        monthItem.textContent = `${month}`;
        
        let dayItem = document.createElement('li');
        dayItem.className = 'list-group-item';
        dayItem.textContent = `${day}`;
        
        let yearItem = document.createElement('li');
        yearItem.className = 'list-group-item';
        yearItem.textContent = `${year}`;
        
        listGroup.appendChild(monthItem);
        listGroup.appendChild(dayItem);
        listGroup.appendChild(yearItem);
        
        listContainer.appendChild(listGroup);
        dateInput.value = '';
    }
};



// next step: change console log to list output,
// then have dynamic output based on the person's guess