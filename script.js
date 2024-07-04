console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songBannerImage = document.getElementById('songBannerImage');

let songs = [
    {songName: "Asal Mein-Darshan Raval", filepath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Ek Taraf-Darshan Raval", filepath: "2.mpeg", coverPath: "2.jpeg"},
    {songName: "Mahiye Jinna Sohna-Darshan Raval", filepath: "3.mpeg", coverPath: "3.jpeg"},
    {songName: "Soni Soni-Darshan Raval", filepath: "4.mpeg", coverPath: "4.jpeg"},
    {songName: "Ek Ladki Ko Dekha-Darshan Raval", filepath: "5.mpeg", coverPath: "5.jpeg"},
    {songName: "Hawa Banke-Darshan Raval", filepath: "6.mpeg", coverPath: "6.jpeg"},
    {songName: "Mujhe Peene Do-Darshan Raval", filepath: "7.mpeg", coverPath: "7.jpeg"},
    {songName: "Tu Hai-Darshan Raval", filepath: "8.mpeg", coverPath: "8.jpeg"},
    {songName: "Jannat Ve-Darshan Raval", filepath: "9.mpeg", coverPath: "9.jpeg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seek bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seekbar change event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = i;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // Update song banner image
        songBannerImage.src = songs[songIndex].coverPath;
    });
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    // Update song banner image
    songBannerImage.src = songs[songIndex].coverPath;
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    // Update song banner image
    songBannerImage.src = songs[songIndex].coverPath;
});
