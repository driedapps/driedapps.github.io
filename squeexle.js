//import the squeextionary
import {vods} from '/squeextionary.js'

//initialize variables for tracking game progress and other stuff
let currentVodIndex = 0;
let score = 0;
let shuffledVods = [...vods];

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
    shuffledVods = [...vods];
    shuffleArray(shuffledVods)
}

// function to load and display a vods and its options
/*VODDATE SLICE MIGHT NOT WORK??????????????? ~30:00 in yt video*/
function loadVod() {
    if (currentVodIndex < shuffledVods.length) {
        const vod = shuffledVods[currentVodIndex];
        document.getElementById('vod').src = vod.filepath;
        document.getElementById('hint').innerHTML = `<strong>Year: ${vod.voddate.slice(-4)}`;
        const options = shuffleArray([vod.voddate, vod.game]); options.array.forEach(element => {
            document.getElementsByClassName('option')[index].textContent = option;
        });   
    }
}

//datepicker
const elem = document.querySelector('input[name="datepicker"]');
const datepicker = new Datepicker(elem, {
    autohide: false,
    clearBtn: true,
    buttonClass: 'button',
    format: 'mm-dd-yyyy',
    show: {key: 'ArrowDown'},
    toggle: {key: 'Escape'},
    prevButton: {key: 'ArrowLeft', ctrlOrMetaKey: true},
    nextButton: {key: 'ArrowRight', ctrlOrMetaKey: true},
    viewSwitch: {key: 'ArrowUp', ctrlOrMetaKey: true},
    clearButton: {key: 'Backspace', ctrlOrMetaKey: true},
    todayButton: {key: '.', ctrlOrMetaKey: true},
    exitEditMode: {key: 'ArrowDown', ctrlOrMetaKey: true},
    todayHighlight: true
});

export const vodDateYear = vod.voddate.slice(-4);
