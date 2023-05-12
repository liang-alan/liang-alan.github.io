var clientID = "e0f79a8db48a47a182fb333d07844fcd";
var clientSecret = "2ce7ee3bc09e4562a2a99a8b957a7653";
var redirect_uri = "https://pixelfish123.github.io/LyricQuizzer/lyricGame.html";

const AUTHORIZE = "https://accounts.spotify.com/authorize";

function submitLogin() {
    let url = AUTHORIZE;
    url += "?client_id=" + clientID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-read-private user-library-read user-read-email";
    console.log("logging in...");
    localStorage.setItem("clientID", clientID);
    localStorage.setItem("clientSecret", clientSecret);
    window.location.href = url;
}

function onLoad() {
    if (window.location.search.length > 0 ) {
        handleRedirect();
    }
}
function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
    }
    return code;
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + clientID;
    body += "&client_secret=" + clientSecret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://accounts.spotify.com/api/token", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic' + btoa(clientID + ":" + clientSecret));
    xhr.send(body);
    xhr.onLoad = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        console.log(data);
        var data = JSON.parse(this.responseText);
    
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    } else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function getPlaylists() {
    callApi("GET", "https://api.spotify.com/v1/me/playlists", null, handlePlaylistsResponse);
}

function getUsername() {
    callApi("GET", "https://api.spotify.com/v1/me", null, handleUsernameResponse);
}

function handlePlaylistsResponse() {
    if (this.status == 200) {
        console.log(data);
        var data = JSON.parse(this.responseText);
        removeAllItems("playlists");
        data.items.forEach(item => addPlaylist(item));
    } else if (this.status == 401){
        refreshAccessToken();
    } else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addPlaylist(item) {
    let node = document.createElement("Option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlist").appendChild(node);
}

function handleUsernameResponse() {
    if (this.status == 200) {
        console.log(data);
        var data = JSON.parse(this.responseText);
        removeAllItems("display_name");
        data.items.forEach(item => addName(item));
    } else if (this.status == 401) {
        refreshAccessToken();
    } else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}
function addName(item) {
    document.getElementById("Welcome").innerHTML = "Welcome, " + item.name;
}

function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

function removeAllItems(elementID) {
    let node = document.getElementById(elementID);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}


function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + clientID;
    callAuthorizationApi(body);
}

