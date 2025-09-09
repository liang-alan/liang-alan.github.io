window.addEventListener('load', function () {
    // Select the preloader element
    var preloader = document.querySelector('.preloader');

    // Hide the preloader
    preloader.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    activateAnimation('.fade-down');
    activateAnimation('.fade-up');
    activateAnimation('.fade-left');
    // activateAnimation('.fade-down', 'fade-down');
});

function activateAnimation(selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (element) {
        element.classList.add('active');     
    });
}

function switchPage(name) {
    // Change the URL to the desired page
    window.location.href = name + '.html';
}

function newTab(url) {
    window.open(url, '_blank');
}

// Clear input fields and textareas on page load
window.addEventListener('load', function () {
    // Select input fields and textareas
    var inputs = document.querySelectorAll('input, textarea');

    // Loop through and set the value to an empty string
    inputs.forEach(function (input) {
        input.value = '';
    });
});

window.addEventListener('scroll', function () {
    var button = document.getElementById('back-to-top');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        // button.style.display = 'block';
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto'; // clickable
    } else {
        // button.style.display = 'none';
        button.style.opacity = '0';
        button.style.pointerEvents = 'none'; //  unclickable
    }
});


function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showEssay() {
    var select = document.getElementById('essay-select');
    var viewer = document.getElementById('essay-viewer');
    var selectedEssay = select.value;

    // Nothing selected
    if (selectedEssay === "") return;


    // Remove any existing embed
    viewer.innerHTML = '';

    // Create new embed element
    var embed = document.createElement('embed');
    embed.src = selectedEssay;
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '800px';

    viewer.appendChild(embed);

    // Update the URL with the selected essay (using hash)
    window.location.hash = encodeURIComponent(selectedEssay);
}

// On page load, check if there's a hash and show the essay
window.addEventListener('DOMContentLoaded', function () {
    var hash = window.location.hash.slice(1);
    if (hash) {
        var select = document.getElementById('essay-select');
        var decoded = decodeURIComponent(hash);
        select.value = decoded;
        showEssay();
    }
});