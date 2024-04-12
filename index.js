const addSongButton = document.getElementById('add-song-button');
const songInput = document.getElementById('song-input');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const volumeSlider = document.getElementById('volume-slider');
const createPlaylistButton = document.getElementById('create-playlist-button');
const playlistInput = document.getElementById('playlist-input');
const savePlaylistButton = document.getElementById('save-playlist-button');
const loadPlaylistButton = document.getElementById('load-playlist-button');
const playlistSelector = document.getElementById('playlist-selector');

const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('list');
const heartButton = document.getElementById('heart');
const playButton = document.getElementById('play-button');

let currentTime = 0;

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = commentInput.value;
  const commentElement = document.createElement('p');
  commentElement.textContent = comment;
  commentsList.appendChild(commentElement);
  commentInput.value = '';
});

heartButton.addEventListener('click', () => {
  const songName = document.getElementById('song-name');
  songName.textContent = 'Loves this song';
});

playButton.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.currentTime = currentTime;
    audioPlayer.play();
  }
});


// Add event listener to audio player to update current song display
const audioPlayer = document.getElementById('audio-player');
audioPlayer.addEventListener('play', () => {
  const songName = document.getElementById('song-name');
  const songDuration = document.getElementById('song-duration');
  songName.textContent = audioPlayer.currentSrc.split('/').pop();
  songDuration.textContent = `${audioPlayer.duration} seconds`;
});

audioPlayer.addEventListener('timeupdate', () => {
  currentTime = audioPlayer.currentTime;
});

let songs = [];
let playlists = [];
let currentPlaylist = null;

addSongButton.addEventListener('click', () => {
  songInput.click();
  const fileName = songInput.files[0].name;
  const songNameElement = document.getElementById('song-name');
  songNameElement.textContent = fileName;
});


songInput.addEventListener('change', (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    songs.push(file);
  }
  songInput.value = '';
});

playButton.addEventListener('click', () => {
  if (songs.length > 0) {
    const song = songs.shift();
    audioPlayer.src = URL.createObjectURL(song);
    audioPlayer.play();
    playButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
  }
});

pauseButton.addEventListener('click', () => {
  audioPlayer.pause();
  pauseButton.disabled = true;
  playButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  pauseButton.disabled = true;
  playButton.disabled = false;
  stopButton.disabled = true;
});

const forwardInput = document.getElementById('forward-input');
const backInput = document.getElementById('back-input');

forwardInput.addEventListener('input', () => {
  const newTime = currentTime + parseFloat(forwardInput.value);
  if (newTime < audioPlayer.duration) {
    currentTime = newTime;
    audioPlayer.currentTime = currentTime;
  }
});

backInput.addEventListener('input', () => {
  const newTime = currentTime - parseFloat(backInput.value);
  if (newTime >= 0) {
    currentTime = newTime;
    audioPlayer.currentTime = currentTime;
  }
});

audioPlayer.addEventListener('ended', () => {
  pauseButton.disabled = true;
  playButton.disabled = false;
  stopButton.disabled = true;
});

volumeSlider.addEventListener('input', (event) => {
  audioPlayer.volume = event.target.value;
});

class Playlist {
  constructor(name) {
    this.name = name;
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  removeSong(song) {
    const index = this.songs.indexOf(song);
    if (index > -1) {
      this.songs.splice(index, 1);
    }
  }
}

//Modify the createPlaylistButton while click event listener it create a new Playlist object and add it to the playlists array:
createPlaylistButton.addEventListener('click', () => {
  const playlistName = playlistInput.value;
  const playlist = new Playlist(playlistName);
  playlists.push(playlist);
  playlistInput.value = '';
  savePlaylistButton.disabled = false;
  loadPlaylistButton.disabled = false;
  playlistSelector.disabled = false;
  playlistSelector.innerHTML = '';
  playlists.forEach((playlist) => {
    const option = document.createElement('option');
    option.value = playlist.name;
    option.textContent = playlist.name;
    playlistSelector.add(option);
  });
});


//Modifying the savePlaylistButton  while you click, an event listener is processed to save the current playlist:
savePlaylistButton.addEventListener('click', () => {
  const selectedPlaylist = playlistSelector.value;
  const playlist = playlists.find((playlist) => playlist.name === selectedPlaylist);
  if (playlist) {
    playlist.songs = songs.slice();
    alert('Playlist saved!');
  }
});


const playlistSongs = document.getElementById('playlist-songs');

songInput.addEventListener('change', (event) => {
  const files = event.target.files;
  for (const file of files) {
    const song = document.createElement('div');
    song.textContent = file.name;
    playlistSongs.appendChild(song);
  }
});

//Modifying the loadPlaylistButton while clicking event listener loads a saved playlist:
loadPlaylistButton.addEventListener('click', () => {
  const selectedPlaylist = playlistSelector.value;
  const playlist = playlists.find((playlist) => playlist.name === selectedPlaylist);
  if (playlist) {
    songs = playlist.songs.slice();
    alert('Playlist loaded!');
  }
});

//selecting the list element where the comments will be displayed:
const commentList = document.getElementById('list');

//selecting the comment-input element where the user will enter their comment:
const commentInput = document.getElementById('comment-input');