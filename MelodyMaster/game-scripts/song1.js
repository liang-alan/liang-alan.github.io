function startTimer() {
    createNotes();
    var min = 0;
    var sec = 0;
    setInterval(function () {
        // console.log((beat % 4) + 1);
        beat++;
        // document.getElementById("beat").innerHTML = beat;
    }, 750);
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
function createNotes() {
    spawn("P");


    function spawn(letter) {
        // console.log("spawning", "button"+ letter);
        var button = document.getElementById("button" + letter);
        var x = button.getBoundingClientRect().left;
        // x += button.offsetWidth / 2;
        var y = 0.1 * window.innerHeight;
        var note = document.createElement("div");
        note.className = 'note color6 circle'
        note.style.width = button.getBoundingClientRect().width + "px";
        note.style.height = note.style.width;
        note.style.left = x + "px";
        note.style.top = y + "px";
        note.addEventListener('animationend', handleAnimationEnd);
        document.addEventListener('keydown', function (event) {
            if (event.key === letter || event.key === letter.toLowerCase()) {
                checkOverlap(button, note);
            }
        });
        document.getElementById("col"+letter).appendChild(note);
        // var p = document.createElement("p");
        // var text = document.createTextNode("Hello World");
        // p.appendChild(text);
        // document.getElementById("game").appendChild(p);
        console.log("spawned", letter);
    }
    function handleAnimationEnd(event) {
        // Remove the animated element from the DOM
        event.target.remove();
        document.removeEventListener('keydown', function (event) {
            if (event.key === letter || event.key === letter.toLowerCase()) {
                console.log("hello!")
                if (checkOverlap(button, note)) {
                    note.remove();
                    document.getElementById("score").innerHTML = "Score:" + (parseInt(document.getElementById("score").innerHTML.split(":")[1]) + 1);
                }
            }
        });
    }
    function checkOverlap(button, note) {
        var noteRect = note.getBoundingClientRect();
        var buttonRect = button.getBoundingClientRect();
        var confidence = buttonRect.width * 0.2;

        if (
            noteRect.bottom > buttonRect.bottom - confidence &&
            noteRect.bottom < buttonRect.bottom + confidence
        ) {
            console.log("Circle is on top of the button");
            note.remove();
            document.getElementById("score").innerHTML = "Score:" + (parseInt(document.getElementById("score").innerHTML.split(":")[1]) + 1);
        }
    }
}

// Get the falling circle element
var fallingCircle = document.getElementsByClassName('note color6');
// Set the initial position of the falling circle
var positionY = 0;
// Set the animation speed (you can adjust this)
var speed = 2;
// Function to update the position of the falling circle
function updatePosition() {
    // Increment the Y position
    positionY += speed;

    // Apply the new position
    fallingCircle.style.top = positionY + 'px';

    // Request the next animation frame
    requestAnimationFrame(updatePosition);
}