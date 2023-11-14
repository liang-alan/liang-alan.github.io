var beat = 0;
var subbeat = 1;
function startTimer() {
    var min = 0;
    var sec = 0;
    setInterval(function () {
        // console.log((beat%4)+1,subbeat);
        subbeat++;
        if (subbeat == 5) {
            subbeat = 1;
            beat++;
        }
        createNotes();
    }, 188); // 188ms * 4 = 752ms for 80bpm
    
    setInterval(function () {
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
        sec++;  // increment seconds
    }, 1000);

}
async function createNotes() {
    if (subbeat == 1) {
        spawn("Q");
    }
}
function spawn(letter) {
    // console.log("spawning", "button"+ letter);
    var button = document.getElementById("button" + letter);
    var x = button.getBoundingClientRect().left;
    // x += button.offsetWidth / 2;
    var y = 0.05 * window.innerHeight;
    var note = document.createElement("div");
    switch (letter) {
        case "Q":
            note.className = 'note color1 circle'
            break;
        case "W":
            note.className = 'note color2 circle'
            break;
        case "E":
            note.className = 'note color3 circle'
            break;
        case "I":
            note.className = 'note color4 circle'
            break;
        case "O":
            note.className = 'note color5 circle'
            break;
        case "P":
            note.className = 'note color6 circle'
            break;
    }
    note.style.width = button.getBoundingClientRect().width + "px";
    note.style.height = note.style.width;
    note.style.left = x + "px";
    note.style.top = y + "px";
    note.style.animationDuration = "1.4s";
    note.addEventListener('animationend', handleAnimationEnd); // delete the circle upon animation end
    document.getElementById("col" + letter).appendChild(note);
    console.log("spawned", letter);
}
function handleAnimationEnd(event) {
    // Remove the animated element from the DOM
    event.target.remove();
    console.log("remove at the end of animation and listener");
}
