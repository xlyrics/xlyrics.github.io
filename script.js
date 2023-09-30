document.addEventListener("DOMContentLoaded", function () {
    const songList = document.querySelectorAll(".song-details");
    const musicPlayers = document.querySelectorAll(".music-player");
    const volumeControl = document.getElementById("volumeControl");
    const searchInput = document.getElementById("searchInput");
    const autoPlayButton = document.getElementById("autoPlayButton");
    const skipButton = document.getElementById("skipButton"); // Bouton Skip
    const playlistContainer = document.querySelector(".playlist");

    let currentIndex = 0;
    let isAutoPlaying = false;
    let isMusicPlaying = false;

    function playSong(index) {
        if (index >= 0 && index < songList.length) {
            if (isMusicPlaying) {
                musicPlayers[currentIndex].pause();
                isMusicPlaying = false;
            }
            currentIndex = index;
            musicPlayers[index].play();
            isMusicPlaying = true;
            playlistContainer.classList.add("show-music-on-top");
        }
    }

    function clearHighlight() {
        songList.forEach((item) => {
            item.classList.remove("highlighted");
        });
        playlistContainer.classList.remove("show-music-on-top");
    }

    function searchSong(query) {
        query = query.toLowerCase();
        songList.forEach((song, index) => {
            const songTitle = song.querySelector("p").textContent.toLowerCase();
            if (songTitle.includes(query)) {
                song.style.display = "block"; // Afficher la chanson correspondante
            } else {
                song.style.display = "none"; // Masquer les chansons qui ne correspondent pas
            }
        });

        // Mettez en pause la musique en cours si elle ne correspond pas au terme de recherche
        if (currentIndex >= 0 && currentIndex < songList.length) {
            const currentSongTitle = songList[currentIndex].querySelector("p").textContent.toLowerCase();
            if (!currentSongTitle.includes(query) && isMusicPlaying) {
                musicPlayers[currentIndex].pause();
                isMusicPlaying = false;
            }
        }

        // Réinitialisez la liste des chansons en cours de lecture
        currentIndex = -1;

        clearHighlight();
    }

    function highlightSong(index) {
        songList.forEach((item, i) => {
            if (i === index) {
                item.classList.add("highlighted");
            } else {
                item.classList.remove("highlighted");
            }
        });
    }

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim();
        searchSong(searchTerm);
    });

    autoPlayButton.addEventListener("click", function () {
        if (!isAutoPlaying) {
            isAutoPlaying = true;
            playSong(currentIndex);
        }
    });

    skipButton.addEventListener("click", function () {
        if (isAutoPlaying) {
            musicPlayers[currentIndex].pause();
            isMusicPlaying = false;
            currentIndex++;
            if (currentIndex >= songList.length) {
                currentIndex = 0;
            }
            playSong(currentIndex);
        }
    });

    musicPlayers.forEach(function (player, index) {
        player.addEventListener("ended", function () {
            currentIndex++;
            if (currentIndex >= songList.length) {
                currentIndex = 0;
            }
            if (isAutoPlaying) {
                playSong(currentIndex);
            }
        });

        player.addEventListener("pause", function () {
            isMusicPlaying = false;
        });
    });

    function setVolume(volume) {
        musicPlayers.forEach(function (player) {
            player.volume = volume;
        });
    }

    volumeControl.addEventListener("input", function () {
        const volumeValue = parseFloat(volumeControl.value);
        setVolume(volumeValue);
    });
});
