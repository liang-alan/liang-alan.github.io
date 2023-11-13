var beat = 0;

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
    }
    if (event.key === 'W' || event.key === 'w') {
        // console.log('W was pressed');
        document.getElementById("buttonW").style.backgroundColor = Wdown;
    }
    if (event.key === 'E' || event.key === 'e') {
        // console.log('E was pressed');
        document.getElementById("buttonE").style.backgroundColor = Edown;
    }
    if (event.key === 'I' || event.key === 'i') {
        // console.log('I was pressed');
        document.getElementById("buttonI").style.backgroundColor = Idown;
    }
    if (event.key === 'O' || event.key === 'o') {
        // console.log('O was pressed');
        document.getElementById("buttonO").style.backgroundColor = Odown;
    }
    if (event.key === 'P' || event.key === 'p') {
        // console.log('P was pressed');
        console.log(parseInt(document.getElementById("score").innerHTML.split(":")[1]));
        document.getElementById("buttonP").style.backgroundColor = Pdown; 
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
