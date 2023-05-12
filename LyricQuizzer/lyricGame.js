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
