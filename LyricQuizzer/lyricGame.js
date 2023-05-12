var clientID = "";
var clientSecret = "";
var redirect_uri = "https://pixelfish123.github.io/LyricQuizzer/lyricGame.html";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
function pickPlaylist() {
    console.log("pickPlaylist");
}

function submitLogin() {
    let clientID = document.getElementById("clientID").value;
    let clientSecret = document.getElementById("secretID").value;
    localStorage.setItem("clientID", clientID);
    localStorage.setItem("clientSecret", clientSecret);
    // location.href = "\lyricGame.html";
    let url = AUTHORIZE;
    url += "?client_id=" + clientID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-read-private user-library-read user-red-email";
    window.location.href = url;
}
