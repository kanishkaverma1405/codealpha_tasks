
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const playerContainer = document.querySelector('.player-container');

// Song List (Update sources if needed)
const songs = [
    {
        name: 'Ukulele',
        artist: 'Bensound',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        name: 'Creative Mind',
        artist: 'Bensound',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.name;
    artist.innerText = song.artist;
    audio.src = song.src;
    // Generate random cover art
    cover.querySelector('img').src = `https://picsum.photos/200?random=${songIndex}`;
}

function playSong() {
    playerContainer.classList.add('play');
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    cover.classList.add('play');
    audio.play();
}

function pauseSong() {
    playerContainer.classList.remove('play');
    playBtn.querySelector('i').classList.add('fa-play');
    playBtn.querySelector('i').classList.remove('fa-pause');
    cover.classList.remove('play');
    audio.pause();
}

playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Initialize First Song
loadSong(songs[songIndex]);
