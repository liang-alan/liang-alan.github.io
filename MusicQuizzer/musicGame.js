
var redirect_uri = "https://pixelfish123.github.io/MusicQuizzer/musicGame.html"; 

var client_id = "";
var client_secret = ""; 

var access_token = null;
var refresh_token = null;
var currentPlaylist = "";
var tracksInPlaylist = [];
var songName = "";
var artistName = "";
var imageUrl = "";
var audioPlayer = null;
var score = 0;

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const ME = "https://api.spotify.com/v1/me";


function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) { //window.location.search.length gets the length of the query string
        handleRedirect();
    }
    else {
        access_token = localStorage.getItem("access_token");
        if (access_token == null) {
            // we don't have an access token so present token section
            document.getElementById("notLogged").style.display = 'block';
        }
        else {
            // we have an access token so present device section
            document.getElementById("logged").style.display = 'block';
        }
    }
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
    refreshPlaylists();
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function requestAuthorization() {
    client_id = "e0f79a8db48a47a182fb333d07844fcd";
    client_secret = "2ce7ee3bc09e4562a2a99a8b957a7653";
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-library-read streaming user-read-playback-state  playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
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
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}
function refreshPlaylists() {
    callApi("GET", PLAYLISTS, null, handlePlaylistsResponse);
}

function handlePlaylistsResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems("playlists");
        data.items.forEach(item => addPlaylist(item));
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}


function addPlaylist(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists").appendChild(node);
}

function removeAllItems(elementId) {
    let node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
// template for calling stuff
function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback; //callback is a function that handles the response from spotify
}
function fetchTracks() {
    let playlist_id = localStorage.getItem("playlist");
    if (playlist_id.length > 0) {
        url = TRACKS.replace("{{PlaylistId}}", playlist_id);
        callApi("GET", url, null, handleTracksResponse);
    }
}

function handleTracksResponse() {
    console.log("handleTracksResponse functions properly");
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        tracksInPlaylist.length = 0; // clears the array
        data.items.forEach((item, index) => addTrack(item, index)); // adds each track to the array
        data.items.forEach((item, index) => console.log(item.track.name + " (" + item.track.artists[0].name + ")")); // TODO: For testing
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addTrack(item, index) {
    // let node = item.track.name + " (" + item.track.artists[0].name + ")";
    // node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    // document.getElementById("tracks").appendChild(node);
    console.log(item.track.name + " (" + item.track.artists[0].name + ")"); // TODO: For testing
    var song = {
        name: item.track.name,
        artist: item.track.artists[0].name,
        previewURL: item.track.preview_url // link to a tiny clip of the song  
    }
    tracksInPlaylist.push(song);
}

function backToMenu() {
    window.location.href = "lyricGame.html";
}
function startGame() {
    localStorage.setItem("playlist", document.getElementById('playlists').value); //gets the selected playlist stores it into localopyp
    var selectedPlaylist = document.getElementById("playlists");
    var selectedPlaylistName = selectedPlaylist.options[selectedPlaylist.selectedIndex].text;
    localStorage.setItem("playlistName", selectedPlaylistName); 
    window.location.href = "game.html";
}

function loadGame() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) {
        handleRedirect();
    }
    else {
        access_token = localStorage.getItem("access_token");
    }
    document.getElementById("currentPlaylist").innerText += " " + localStorage.getItem("playlistName");
    fetchTracks(); // loads tracks into tracksInPlaylist array
    var userGuess = document.getElementById("guessEntry");
    var buttonPressed = false; // helps prevent user from holding down key
    userGuess.addEventListener("keydown", function (event) {
        console.log("Enter key pressed and registered");
        if (!buttonPressed && event.key === 'Enter') { // if button hasn't been pressed yet
            buttonPressed = true;
            event.preventDefault();
            document.getElementById("guessButton").click();
        }
    });
    userGuess.addEventListener("keyup", function (event) {
        buttonPressed = false;
    });
    
}

function handleImageResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        imageUrl = data.images[0].url;
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function nextSong() {
    if (audioPlayer != null) {
        audioPlayer.pause();
    }
    console.log("nextSong button has been clicked")
    var randomIndex = Math.floor(Math.random() * tracksInPlaylist.length);
    songName = tracksInPlaylist[randomIndex].name;
    artistName = tracksInPlaylist[randomIndex].artist;
    playSong(randomIndex);

}

function playSong(index) {
    console.log("playSong function has been called");
    // console.log("Currently playing" + tracksInPlaylist[index].name + " by " + tracksInPlaylist[index].artist);
    audioPlayer = new Audio(tracksInPlaylist[index].previewURL);
    audioPlayer.play();
}

function submitGuess() {
    var expectedSong = songName; //songName is the full name of the song
    expectedSong = expectedSong.replace(/\(.*/, "").trim(); // truncates extra info such as (ft. artist) or (extended version)
    var userSong = document.getElementById('guessEntry').value;

    var similarity = checkSimilarity(expectedSong.toLowerCase(), userSong.toLowerCase());
    console.log("Comparing your guess: " + userSong + " to " + expectedSong + " gives a similarity of " + similarity)

    document.getElementById("guessEntry").value = ""; //clears the text field after guess is submitted and everthing is done

    if (similarity < 3) { // if user guess is mostly right
        
        document.getElementById('guessResult').innerText = "Correct! The song was " + songName + " by " + artistName;
        console.log('Correct!');	
        updateScore(true);
    } else {

        document.getElementById('guessResult').innerText = "Nope! The song was actually " + songName + " by " + artistName;
        console.log('Wrong! This song was actually ' + expectedSong);
        updateScore(false);
    }
    setTimeout(function () {
        nextSong(); //give the reader 3 seconds to read the result before moving on to the next song
    }, 3000);
}
function updateScore(correct) {
    if (correct) {
        score++;
        document.getElementById('scoreText').innerText = "Score: " + score;
    }
    else {
        score--;
        document.getElementById('scoreText').innerText = "Score: " + score;
    }
}

function checkSimilarity(str1,str2) { // Levenshtein distance algorithm
        const m = str1.length;
        const n = str2.length;

        // Create a matrix to store the distances
        const dp = [];
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            dp[i][0] = i;
        }
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        // Compute the distances
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }

        // Return the Levenshtein distance
        return dp[m][n];
}


