let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let current_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let current_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: 'img/Atmosphere-Sunshine.jpg',
    name: 'Sunshine',
    artist: 'Atmosphere',
    music: 'audio/Atmosphere-Sunshine.mp3'
  },
  {
    img: 'img/Crystalised.jpg',
    name: 'Crystalised',
    artist: 'Gorillaz',
    music: 'audio/Gorillaz - Crystalised (The XX Cover).mp3'
  },
  {
    img: 'img/grandmother.jpg',
    name: 'Grandmother',
    artist: 'Hotel Ugly',
    music: 'audio/Grandmother.mp3'
  },
  {
    img: 'img/famjam4000.png',
    name: 'FAMJAM4000',
    artist: 'Jordan Ward',
    music: 'audio/Jordan Ward - FAMJAM4000.mp3' 
  },
  {
    img: 'img/ImLeaving.jpg',
    name: "I'm Leaving",
    artist: 'Mos Def',
    music: "audio/Mos Def - I'm Leaving.mp3"
  },
  {
    img: 'img/mogwai.jpg',
    name: 'San Pedro',
    artist: 'Mogwai',
    music: "audio/Mogwai - San Pedro.mp3"
  },
  {
    img: 'img/love&hate.jpg',
    name: 'Love & Hate',
    artist: 'Michael Kiwanuka',
    music: "audio/Love & Hate.mp3"
  },
  {
    img: 'img/ThePromisedLand.jpg',
    name: 'The Promised Land',
    artist: 'J. Cole ft. Andre 3000',
    music: 'audio/The Promised Land ft. J. Cole Andre 3000.mp3'
  },
  {
    img: 'img/weightoflove.jpg',
    name: 'Weight of Love',
    artist: 'The Black Keys',
    music: 'audio/The Black Keys - Weight of Love.mp3'
  },
  {
    img: 'img/politics&violence.jpg',
    name: 'Politics & Violence',
    artist: 'Dominic Fike',
    music: 'audio/Politics & Violence.mp3'
  },
  {
    img: 'img/workinout.jpg',
    name: 'Workin Out',
    artist: 'JID',
    music: 'audio/Workin Out.mp3'
  }
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  current_track.src = music_list[track_index].music;
  current_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent = "Playing track " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  current_track.addEventListener('ended', nextTrack);
}

function reset() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  current_track.play();
  isPlaying = true;
  wave.classList.add('loader');
  track_art.classList.add('rotate');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}
function pauseTrack() {
  current_track.pause();
  isPlaying = false;
  wave.classList.remove('loader');
  track_art.classList.remove('rotate');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack() {
  if(track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  }
  else if(track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  }else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if(track_index > 0 ){
    track_index -= 1;
  }else{
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo(){
  let seekto = current_track.duration * (seek_slider.value / 100);
  current_track.currentTime = seekto;
}
function setVolume(){
  current_track.volume = volume_slider.value / 100;
}
function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(current_track.duration)){
    seekPosition = current_track.currentTime * (100 / current_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration -durationMinutes * 60);

    if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
    if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
    if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
    if(durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}