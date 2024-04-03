let currentlyPlayingAudio = null;

function searchMusic() {
    const searchQuery = document.getElementById('searchQuery').value;
    const clientId = '26ee1256'; // Your Jamendo Client ID
    
    // Construct the API URL
    const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=10&search=${encodeURIComponent(searchQuery)}`;

    // Make a GET request to the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Error fetching music:', error);
        });
}

function displayResults(tracks) {
    const musicResults = document.getElementById('musicResults');
    musicResults.innerHTML = '';

    tracks.forEach(track => {
        const trackElement = document.createElement('li');
        const searchResults = document.getElementById('searchResults')
        searchResults.textContent = `Results from ${track.artist_name} playlist`;
        trackElement.classList.add('music-item');
        trackElement.textContent = `${track.name} by ${track.artist_name}`;
        trackElement.addEventListener('click', () => playMusic(track.audio));
        trackElement.innerHTML = `
            <span>${track.name} by ${track.artist_name}</span>
            <button class="download-btn" onclick="downloadMusic('${track.audio}')">Download</button>
        `;
        musicResults.appendChild(trackElement);
    });
}

function downloadMusic(audioUrl) {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'music.mp3'; // You can set the filename dynamically if available
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function playMusic(audioUrl) {
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
    }
    
    const audio = new Audio(audioUrl);
    audio.play();
    currentlyPlayingAudio = audio;
}