document.addEventListener("DOMContentLoaded", function () {
    const songList = document.querySelectorAll(".song-details");
    const musicPlayers = document.querySelectorAll(".music-player");
    const autoPlayButton = document.getElementById("autoPlayButton");
    const volumeControl = document.getElementById("volumeControl");
    let currentIndex = 0;

    function playNextSong() {
        if (currentIndex < songList.length) {
            musicPlayers[currentIndex].play();
            currentIndex++;
        } else {
            currentIndex = 0; // Rejouez la liste depuis le début
        }
    }

    autoPlayButton.addEventListener("click", playNextSong);

    musicPlayers.forEach(function (player, index) {
        player.addEventListener("ended", function () {
            currentIndex = index + 1;
            playNextSong();
        });
    });

    // Fonction pour régler le volume de tous les lecteurs audio
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
