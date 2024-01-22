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