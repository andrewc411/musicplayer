const musicContainer = document.querySelector('.music-container');
// const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


// console.log(playBtn);

// Song titles
// Fill array with names of songs
const songs = ['Sunshine', 'Crystalised', 'Im Leaving', 'The Promised Land']

//Keep track of the songs
let songIndex = 1;

// Initially load song into DOM
loadSong(songs[songIndex])

//Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/${song}.jpg`
}

// Retrieve the 'play' button element using the updated ID
const playBtn = document.getElementById('#play');

// Check if the element was found before modifying it
if (playBtn) {
  // Use querySelector() on playBtn to select the nested 'i.fas' element
  const playIcon = playBtn.querySelector('i.fas');
  
  // Modify the classList properties of the 'i.fas' element as intended
  playIcon.classList.remove('fa-play');
  playIcon.classList.add('fa-pause');
} else {
  console.log('Could not find play button element.');
}


function playSong() {
// check if the element exists
if (playBtn) {
  // toggle between fa-play and fa-pause classes
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
} else {
  console.log('Element not found.');
}
}

function pauseSong() {
// check if the element exists
if (playBtn) {
    // toggle between fa-play and fa-pause classes
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
  } else {
    console.log('Element not found.');
  }
}
// function playSong() {
//     musicContainer.classList.add('play')
//     playBtn.querySelector('i.fas').classList.remove('fa-play')
//     playBtn.querySelector('i.fas').classList.add('fa-pause')
// }

// function pauseSong() {
//     musicContainer.classList.remove('play')
//     playBtn.querySelector('i.fas').classList.remove('fa-pause')
//     playBtn.querySelector('i.fas').classList.add('fa-play')
// }

// Event Listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})