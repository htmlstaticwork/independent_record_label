// Music Player UI Logic
const songs = [
    { title: "Ghost in the Machine", artist: "VELVET NOISE", duration: "3:45", id: 1 },
    { title: "Neon Streets", artist: "NEON CULT", duration: "4:12", id: 2 },
    { title: "Lost in Echoes", artist: "ECHO DUST", duration: "3:20", id: 3 }
];

let isPlaying = false;
let currentTrack = 0;

function initMiniPlayer() {
    const player = document.getElementById('mini-player');
    if (!player) return;

    const playBtn = player.querySelector('.play-pause-btn');
    const trackTitle = player.querySelector('.track-title');
    const trackArtist = player.querySelector('.track-artist');
    const progress = player.querySelector('.progress-bar');

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const icon = playBtn.querySelector('i');
        icon.className = isPlaying ? 'ri-pause-line' : 'ri-play-line';
        if (isPlaying) {
            gsap.to('.player-visualizer .bar', {
                height: () => Math.random() * 20 + 5,
                duration: 0.1,
                repeat: -1,
                yoyo: true,
                stagger: 0.05
            });
        } else {
            gsap.killTweensOf('.player-visualizer .bar');
            gsap.to('.player-visualizer .bar', { height: 2, duration: 0.3 });
        }
    });

    const nextBtn = player.querySelector('.next-btn');
    nextBtn.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % songs.length;
        updateTrackInfo();
    });

    function updateTrackInfo() {
        trackTitle.textContent = songs[currentTrack].title;
        trackArtist.textContent = songs[currentTrack].artist;
    }

    updateTrackInfo();
}

document.addEventListener('DOMContentLoaded', initMiniPlayer);
