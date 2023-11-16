
var beat = 1;
var subbeat = 1;
function startTimer() {
    document.getElementsByClassName("instructions")[0].style.display = "none";
    var min = 0;
    var sec = 0;
    setInterval(function () {
        console.log(beat);
        console.log(((beat - 1) % 4) + 1, subbeat);
        createNotes();
        if (beat == 2 && subbeat == 3) {
            startAudio();
            console.log("start audio");
        }
        if (subbeat == 4) {
            subbeat = 0;
            beat++;
        }
        subbeat++;
    }, 100); // 100ms * 4 = 0.4s per beat = 150bpm
    
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
async function createNotes() {

}

function startAudio() {
    var audio = document.getElementById("audio");
    audio.play();
}
function spawn(letter) {
    // console.log("spawning", "button"+ letter);
    var button = document.getElementById("button" + letter);
    var x = button.getBoundingClientRect().left;
    // x += button.offsetWidth / 2;
    var y = 0.075 * window.innerHeight;
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
    note.style.animationDuration = "1.4s"; 
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
