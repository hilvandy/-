const playlist = [
    { id: '1824020871', title: '我记得', artist: '赵雷' },
    { id: '1842025914', title: '晚安', artist: '颜人中' },
    { id: '1413863166', title: '世间美好与你环环相扣', artist: '柏松' },
    { id: '1374051000', title: '让风告诉你', artist: '花粥, 王胜娚' },
    { id: '1359356908', title: '下雨天', artist: '南游记' },
];

let currentTrackIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audio-player');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playPauseButton = document.getElementById('play-pause');
const prevTrackButton = document.getElementById('prev-track');
const nextTrackButton = document.getElementById('next-track');
const timeSlider = document.getElementById('time-slider');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audioPlayer.load();
    audioPlayer.play().catch(error => console.error("Autoplay failed:", error));
    isPlaying = true;
    playPauseButton.textContent = '⏸️';
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.textContent = '▶️';
    } else {
        audioPlayer.play();
        playPauseButton.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

function updateCurrentTime() {
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    timeSlider.value = audioPlayer.currentTime;
}

function updateDuration() {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
    timeSlider.max = audioPlayer.duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
}

audioPlayer.addEventListener('timeupdate', updateCurrentTime);
audioPlayer.addEventListener('loadedmetadata', updateDuration);
audioPlayer.addEventListener('ended', nextTrack);

playPauseButton.addEventListener('click', togglePlayPause);
prevTrackButton.addEventListener('click', prevTrack);
nextTrackButton.addEventListener('click', nextTrack);

timeSlider.addEventListener('input', (e) => {
    audioPlayer.currentTime = e.target.value;
});

volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

loadTrack(currentTrackIndex);
