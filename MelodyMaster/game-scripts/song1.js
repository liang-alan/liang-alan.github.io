const bpm = 75;
const beatLength = (60 / bpm) * 1000; // in ms
const animationDuration = 2 * beatLength; // in ms
var baseLatency = 0;
var outputLatency = 0;

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
    audioElement.play(); 
    console.log(audioContext.baseLatency, audioContext.outputLatency);
    baseLatency = audioContext.baseLatency;
    outputLatency = audioContext.outputLatency;
    createNotes();
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
    spawnTimer("Q", toMS(1, 1, 0));
    spawnTimer("Q", toMS(1, 2, 0));
    spawnTimer("Q", toMS(1, 3, 0));
    spawnTimer("W", toMS(1, 3, 3 / 4));
    spawnTimer("E", toMS(1, 4, 0));
    spawnTimer("E", toMS(2, 1, 0));
    spawnTimer("E", toMS(2, 2, 0));
    spawnTimer("I", toMS(2, 3, 0));
    spawnTimer("P", toMS(3, 1, 0));
    spawnTimer("I", toMS(3, 2, 0));
    spawnTimer("E", toMS(3, 3, 0));
    spawnTimer("Q", toMS(3, 4, 0));
    spawnTimer("O", toMS(4, 1, 0));
    spawnTimer("I", toMS(4, 1, 3 / 4));
    spawnTimer("E", toMS(4, 2, 0));
    spawnTimer("W", toMS(4, 2, 3 / 4));
    spawnTimer("Q", toMS(4, 3, 0));
}

function toMS(measure, beat, offset) {
    var spawnTime = 4 * (measure) * beatLength + // no minus one because of the 4 beat intro
        (beat - 1) * beatLength +
        offset * (beatLength);
    console.log("spawn time:", spawnTime, ",base latency:", baseLatency * 1000, ",animation duration:", animationDuration, ",output latency:", outputLatency * 1000);
    return spawnTime - animationDuration  + (baseLatency * 1000);
}

function spawnTimer(letter, spawnTime) {
    // console.log(animationDuration);
    console.log("spawning", "button"+ letter, "at", spawnTime)
    setTimeout(function () {
        spawn(letter);
    }, spawnTime);
}

function spawn(letter) {
    // console.log("spawning", "note "+ letter);
    var button = document.getElementById("button" + letter);
    var x = button.getBoundingClientRect().left;
    var y = 0.0675 * window.innerHeight;
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
    note.style.animationDuration = (animationDuration / 1000) + 0.075* (animationDuration / 1000)+ "s"; 
    
    console.log("animation duration:", note.style.animationDuration);
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
