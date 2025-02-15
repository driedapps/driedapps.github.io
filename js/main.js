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
    document.getElementById("guessDate").addEventListener("click", function() {

            console.log("addDate function called");
            let dateInput = document.getElementById('dateInput');
            let dateValue = dateInput.value;

            if (dateValue) {
                let date = dateValue;

                let [year, month, day] = date.split('-');

                let listContainer = document.getElementById('dateListContainer');
                listContainer.style.display = 'block';
                
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
            else {
                    console.warn("No date entered");
                }
            
        });
});


// next step: change console log to list output,
// then have dynamic output based on the person's guess