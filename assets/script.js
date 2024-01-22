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