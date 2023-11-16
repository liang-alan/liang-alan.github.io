const bpm = 75;
const beatLength = (60 / bpm) * 1000; // in ms
const animationDuration = 2 * beatLength; // in ms
var baseLatency = 0;

function startTimer() {
    // console.log("playing")
    document.getElementsByClassName("instructions")[0].style.display = "none";
    // Create an audio context
    audioContext = new window.AudioContext();
        // Create an audio element
    const audioElement = new Audio('../assets/audio/Rowboat.mp3');
        // Create an audio source node
    const source = audioContext.createMediaElementSource(audioElement);

        // Connect the source to the audio context's destination (speakers)
    source.connect(audioContext.destination);
    createNotes();
    audioElement.play(); 
    console.log(audioContext.baseLatency, audioContext.outputLatency);
    baseLatency = audioContext.baseLatency;
    var sec = 0;
    var min = 0;
    setInterval(function () {
        sec++;  // increment seconds    
        if (sec == 60) {
            min++;
            sec = 0;
        }
        document.getElementById("timer").innerHTML = min;
        if (sec < 10) {
            document.getElementById("timer").innerHTML += ":0" + sec;
        } else {
            document.getElementById("timer").innerHTML = min + ":" + sec;
        }
    }, 1000);

}
function createNotes() {
    console.log("creating notes");
    spawn("Q");
    setTimeout(spawn("Q"), toMS(1, 1, 0));


    // if (beat == 6 && subbeat == 1) {
    //     spawn("Q");
    // }
    // if (beat == 7 && subbeat == 1) {
    //     spawn("Q");
    // }
    // if (beat == 7 && subbeat == 4) {
    //     spawn("W");
    // }
    // if (beat == 8 && subbeat == 1) {
    //     spawn("E");
    // }
    // if (beat == 9 && subbeat == 1) {
    //     spawn("E");
    // }
    // if (beat == 10 && subbeat == 1) {
    //     spawn("E");
    // }
    // if (beat == 11 && subbeat == 1) {
    //     spawn("I");
    // }
    // if (beat == 13 && subbeat == 1) {
    //     spawn("P");
    // }
    // if (beat == 14 && subbeat == 1) {
    //     spawn("I");
    // }
    // if (beat == 15 && subbeat == 1) {
    //     spawn("E");
    // }
    // if (beat == 16 && subbeat == 1) {
    //     spawn("Q");
    // }
    // if (beat == 17 && subbeat == 1) {
    //     spawn("O");
    // }
    // if (beat == 17 && subbeat == 4) {
    //     spawn("I");
    // }
    // if (beat == 18 && subbeat ==1) {
    //     spawn("E");
    // }
    // if (beat == 18 && subbeat == 4) {
    //     spawn("W");
    // }
    // if (beat == 19 && subbeat == 1) {
    //     spawn("Q");
    // }
}

function toMS(measure, beat, offset) {
    var spawnTime = (measure - 1) * 4 * beatLength + (beat - 1) * beatLength + offset;
    return spawnTime - (baseLatency * 1000) -animationDuration;
}

function spawn(letter) {
    // console.log("spawning", "button"+ letter);
    var button = document.getElementById("button" + letter);
    var x = button.getBoundingClientRect().left;
    var y = 0.0775 * window.innerHeight;
    var note = document.createElement("div");
    switch (letter) {
        case "Q":
            note.className = 'note color1 circle falling'
            break;
        case "W":
            note.className = 'note color2 circle falling'
            break;
        case "E":
            note.className = 'note color3 circle falling'
            break;
        case "I":
            note.className = 'note color4 circle falling'
            break;
        case "O":
            note.className = 'note color5 circle falling'
            break;
        case "P":
            note.className = 'note color6 circle falling'
            break;
    }
    note.style.width = button.getBoundingClientRect().width + "px";
    note.style.height = note.style.width;
    note.style.left = x + "px";
    note.style.top = y + "px";
    note.style.animationDuration = "" + animationDuration/1000 + "s"; 
    note.addEventListener('animationend', handleAnimationEnd); // delete the circle upon animation end
    document.getElementById("col" + letter).appendChild(note);
    // console.log("spawned", letter);
}
function handleAnimationEnd(event) {
    // Remove the animated element from the DOM
    event.target.remove();
    // console.log("remove at the end of animation and listener");
    if (event.target.classList.contains("falling")) {
        document.getElementById("score").innerHTML = "Score:" + (parseInt(document.getElementById("score").innerHTML.split(":")[1]) - 1);
    }

}
