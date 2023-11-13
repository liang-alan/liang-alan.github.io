function onStart() {
    
}

const A = "red";
const Adown = "#cc0000";
const B = "orangered";
const Bdown = "#cc3700";
const C = "goldenrod";
const Cdown = "#ae8319";
const D = "teal";
const Ddown = "#004d4d";
const E = "blueviolet";
const Edown = "#701ac0";
const F = "magenta";
const Fdown = "#cc00cc";

document.addEventListener('keydown', function (event) {
    if (event.key === 'Q' || event.key === 'q') {
        // console.log('Q was pressed');
        document.getElementById("buttonA").style.backgroundColor = Adown;
    }
    if (event.key === 'W' || event.key === 'w') {
        // console.log('W was pressed');
        document.getElementById("buttonB").style.backgroundColor = Bdown;
    }
    if (event.key === 'E' || event.key === 'e') {
        // console.log('E was pressed');
        document.getElementById("buttonC").style.backgroundColor = Cdown;
    }
    if (event.key === 'I' || event.key === 'i') {
        // console.log('I was pressed');
        document.getElementById("buttonD").style.backgroundColor = Ddown;
    }
    if (event.key === 'O' || event.key === 'o') {
        // console.log('O was pressed');
        document.getElementById("buttonE").style.backgroundColor = Edown;
    }
    if (event.key === 'P' || event.key === 'p') {
        // console.log('P was pressed');
        document.getElementById("buttonF").style.backgroundColor = Fdown;
    }
});


document.addEventListener('keyup', function (event) {
    if (event.key === 'Q' || event.key === 'q') {
        // console.log('Q was released');
        document.getElementById("buttonA").style.backgroundColor = A;
    }
    if (event.key === 'W' || event.key === 'w') {
        // console.log('W was released');
        document.getElementById("buttonB").style.backgroundColor = B;
    }
    if (event.key === 'E' || event.key === 'e') {
        // console.log('E was released');
        document.getElementById("buttonC").style.backgroundColor = C;
    }
    if (event.key === 'I' || event.key === 'i') {
        // console.log('I was released');
        document.getElementById("buttonD").style.backgroundColor = D;
    }
    if (event.key === 'O' || event.key === 'o') {
        // console.log('O was released');
        document.getElementById("buttonE").style.backgroundColor = E;
    }
    if (event.key === 'P' || event.key === 'p') {
        // console.log('P was released');
        document.getElementById("buttonF").style.backgroundColor = F;
    }
});
