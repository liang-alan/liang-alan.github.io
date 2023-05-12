var clientID = "e0f79a8db48a47a182fb333d07844fcd";
var clientSecret = "2ce7ee3bc09e4562a2a99a8b957a7653";
var redirect_uri = "https://pixelfish123.github.io/LyricQuizzer/lyricGame.html";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
function pickPlaylist() {
    console.log("pickPlaylist");
}

function submitLogin() {
    let url = AUTHORIZE;
    url += "?client_id=" + clientID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-read-private user-library-read user-read-email";
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
    xhr.setRequestHeader('Authorization', 'Basic' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onLoad = handleAuthorizationResponse();
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

