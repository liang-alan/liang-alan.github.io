const CLIENTID = "e0f79a8db48a47a182fb333d07844fcd";
const clientSecret = "2ce7ee3bc09e4562a2a99a8b957a7653";
const scopes = ["playlist-read-private", "user-library-read", "user-read-email"]
var redirect_uri = "https://pixelfish123.github.io/LyricQuizzer/lyricGame.html";

const AUTHORIZE = "https://accounts.spotify.com/authorize?";

function submitLogin() {
    let url = AUTHORIZE;
    url += "client_id=" + encodeURIComponent(CLIENTID);
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&scope=" + encodeURIComponent(scopes.join(" "));
    console.log("logging in...");
    localStorage.setItem("CLIENTID", CLIENTID);
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

function fetchAccessToken(authCode) {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENTID + ':' + clientSecret)
        },
        body: 'grant_type=authorization_code' +
            '&code=' + authCode +
            '&redirect_uri=' + encodeURIComponent(redirect_uri)
    })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            console.log('Access token: ', accessToken);
        })
        .catch(error => console.error(error));
    localStorage.setItem("accessToken", accessToken);
}

function getDisplayName() {
    fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('User name:', data.display_name);
        })
        .catch(error => console.error(error));
}
