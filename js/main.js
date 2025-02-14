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
            dateButton: document.getElementById("guessDate").onclick,
            dateValue: document.getElementById("dateInput").value,
            listDiv: document.getElementById("dateOutput")
        }
    }
};

dateButton = function() {
    console.log(dateValue); 
};



// next step: change console log to list output,
// then have dynamic output based on the person's guess