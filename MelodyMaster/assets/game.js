
function onStart() {
    alert("Are you ready to start?" +
        "\nUse Q, W, E, I, O, P to play the notes." +
        "\nWhen notes reach the corresponding button, press the key" +
        "\nFor the best experience, use headphones");
    // startTimer();
}

const Q = "red";
const Qdown = "#cc0000";
const W = "orangered";
const Wdown = "#cc3700";
const E = "goldenrod";
const Edown = "#ae8319";
const I = "teal";
const Idown = "#004d4d";
const O = "blueviolet";
const Odown = "#701ac0";
const P = "magenta";
const Pdown = "#cc00cc";

document.addEventListener('keydown', function (event) {
    if (event.key === 'Q' || event.key === 'q') {
        // console.log('Q was pressed');
        document.getElementById("buttonQ").style.backgroundColor = Qdown;
        var note = document.getElementsByClassName("note color1 circle falling")[0];
        var button = document.getElementById("buttonQ");
        checkOverlap(button, note, "Q");
    }
    if (event.key === 'W' || event.key === 'w') {
        // console.log('W was pressed');
        document.getElementById("buttonW").style.backgroundColor = Wdown;
        var note = document.getElementsByClassName("note color2 circle falling")[0];
        var button = document.getElementById("buttonW");
        checkOverlap(button, note, "W");
    }
    if (event.key === 'E' || event.key === 'e') {
        // console.log('E was pressed');
        document.getElementById("buttonE").style.backgroundColor = Edown;
        var note = document.getElementsByClassName("note color3 circle falling")[0];
        var button = document.getElementById("buttonE");
        checkOverlap(button, note, "E");
    }
    if (event.key === 'I' || event.key === 'i') {
        // console.log('I was pressed');
        document.getElementById("buttonI").style.backgroundColor = Idown;
        var note = document.getElementsByClassName("note color4 circle falling")[0];
        var button = document.getElementById("buttonI");
        checkOverlap(button, note, "I");
    }
    if (event.key === 'O' || event.key === 'o') {
        // console.log('O was pressed');
        document.getElementById("buttonO").style.backgroundColor = Odown;
        var note = document.getElementsByClassName("note color5 circle falling")[0];
        var button = document.getElementById("buttonO");
        checkOverlap(button, note, "O");
    }
    if (event.key === 'P' || event.key === 'p') {
        // console.log('P was pressed');
        document.getElementById("buttonP").style.backgroundColor = Pdown; 
        var note = document.getElementsByClassName("note color6 circle falling")[0];
        var button = document.getElementById("buttonP");
        checkOverlap(button, note, "P");
        
    }
});


document.addEventListener('keyup', function (event) {
    if (event.key === 'Q' || event.key === 'q') {
        // console.log('Q was released');
        document.getElementById("buttonQ").style.backgroundColor = Q;
    }
    if (event.key === 'W' || event.key === 'w') {
        // console.log('W was released');
        document.getElementById("buttonW").style.backgroundColor = W;
    }
    if (event.key === 'E' || event.key === 'e') {
        // console.log('E was released');
        document.getElementById("buttonE").style.backgroundColor = E;
    }
    if (event.key === 'I' || event.key === 'i') {
        // console.log('I was released');
        document.getElementById("buttonI").style.backgroundColor = I;
    }
    if (event.key === 'O' || event.key === 'o') {
        // console.log('O was released');
        document.getElementById("buttonO").style.backgroundColor = O;
    }
    if (event.key === 'P' || event.key === 'p') {
        // console.log('P was released');
        document.getElementById("buttonP").style.backgroundColor = P;
    }
});

function checkOverlap(button, note, letter) {
    var noteRect = note.getBoundingClientRect();
    var buttonRect = button.getBoundingClientRect();
    var confidence = buttonRect.width * 0.11;
    if (noteRect.bottom > buttonRect.bottom - confidence &&noteRect.bottom < buttonRect.bottom + confidence) {
        console.log("Circle is on top of the button");
        document.getElementById("score").innerHTML = "Score:" + (parseInt(document.getElementById("score").innerHTML.split(":")[1]) + 3);
        note.remove();
        createPerfectAnimation(button,letter);
        
    } else if (noteRect.bottom > buttonRect.bottom - 2*confidence && noteRect.bottom < buttonRect.bottom + 2*confidence){
        console.log("Circle is on top of the button");
        document.getElementById("score").innerHTML = "Score:" + (parseInt(document.getElementById("score").innerHTML.split(":")[1]) + 1);
        note.remove();
        createSuccessAnimation(button,letter);
    }
    else {
        console.log("Circle is not on top of the button");
        document.getElementById("score").innerHTML = "Score:" + (parseInt(document.getElementById("score").innerHTML.split(":")[1]) - 1);
    }
}

function createPerfectAnimation(button,letter) {
    var animation = document.createElement("div");
    var x = button.getBoundingClientRect().left;
    var y = button.getBoundingClientRect().top;
    animation.style.width = button.getBoundingClientRect().width + "px";
    animation.style.height = animation.style.width;
    animation.style.top = button.getBoundingClientRect().top + "px";
    animation.style.left = x + "px";
    animation.style.top = y + "px";
    animation.className = "perfect circle"
    var color;
    switch (letter) {
        case "Q":
            color = 'color1'
            break;
        case "W":
            color = 'color2'
            break;
        case "E":
            color = 'color3'
            break;
        case "I":
            color = 'color4'
            break;
        case "O":
            color = 'color5'
            break;
        case "P":
            color = 'color6'
            break;
    }
    animation.classList.add(color);

    animation.addEventListener('animationend', function (event) {
        // Remove the animated element from the DOM
        event.target.remove();
    }); // delete the circle upon animation end
    document.getElementById("col" + letter).appendChild(animation);
}
function createSuccessAnimation(button,letter) {
    var animation = document.createElement("div");
    var x = button.getBoundingClientRect().left;
    var y = button.getBoundingClientRect().top;
    animation.style.width = button.getBoundingClientRect().width + "px";
    animation.style.height = animation.style.width;
    animation.style.top = button.getBoundingClientRect().top + "px";
    animation.style.left = x + "px";
    animation.style.top = y + "px";
    animation.className = "success circle"
    var color;
    switch (letter) {
        case "Q":
            color = 'color1'
            break;
        case "W":
            color = 'color2'
            break;
        case "E":
            color = 'color3'
            break;
        case "I":
            color = 'color4'
            break;
        case "O":
            color = 'color5'
            break;
        case "P":
            color = 'color6'
            break;
    }
    animation.classList.add(color);
    animation.addEventListener('animationend', function (event) {
        // Remove the animated element from the DOM
        event.target.remove();
    }); // delete the circle upon animation end
    document.getElementById("col" + letter).appendChild(animation);
}