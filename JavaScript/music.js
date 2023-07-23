const playIcon =document.querySelector('#play')
const nextIcon =document.querySelector('#next')
const speakerIcon =document.querySelector('#speaker')
const prevIcon =document.querySelector('#prev') 
const roundomIcon =document.querySelector('#roundom')
const currentTime =document.querySelector('#currentTime')
const musicTime =document.querySelector('#musicTime') 
const ArtistName =document.querySelector('#ArtistName')
const songName =document.querySelector('#songName')
const music =document.querySelector('audio')
const cover =document.querySelector('#cover')
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

document.body.addEventListener('keydown',(e)=>{
  console.log(e);
  if (e.code === "Space") {
      e.preventDefault()
      
      if (isPlaying) { 
          pauseSong() 
        
      }else{
          playSong() 
         
      }
  }
  if (e.code === "ArrowRight") {
      newTime =music.currentTime + 10
      music.currentTime=newTime
  }
  if (e.code === "ArrowLeft") {
      newTime =music.currentTime - 10
      music.currentTime=newTime
  }
})

const songs = [
  {
    path:
      "../Media/pisho.mp3",
    displayName: "Bazgasht",
    artist: "Pishro",
    cover:
      "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
  },
  {
    path:
      "../Media/Quf_Ft_Fadaei_Shak_128.mp3",
    displayName: "شک",
    artist: "قاف و فدایی",
    cover:
      "../Images/photo_6034947501133510284_y.jpg",
  },
  {
    path:
      "../Media/Faze-Sekte-catchybeatz.mp3",
    displayName: "فاز سختی",
    artist: " صفر بیست و یک بچه و خشی اس ار",
    cover:
      "../Images/خشی.jfif",
  },
   
]

let isPlaying = false;

loadSong(songs[0]);
roundomIcon.addEventListener('click',()=>{
  pauseSong()
  loadSong(songs[2])
})
nextIcon.addEventListener('click',()=>{
  pauseSong()
  loadSong(songs[1])
})
prevIcon.addEventListener('click',()=>{
  pauseSong()
  loadSong(songs[0])
})
function playSong() {
    isPlaying = true;
    playIcon.innerHTML=''
    playIcon.innerHTML=' <i class="fas fa-pause " ></i>'
    music.play(); 
  }
function pauseSong() {
      isPlaying = false; 
      music.pause();
      playIcon.innerHTML=''
      playIcon.innerHTML=' <i class="fas fa-play " ></i>'
    }
  
playIcon.addEventListener("click", function () {
    if (isPlaying) {
      pauseSong()  
    } else {
      playSong() 
      
    }
  })


  function loadSong(song) {
    console.log(song);
    songName.textContent = song.displayName;
    ArtistName.textContent = song.artist;
    music.src = song.path; 
    cover.style.backgroundImage=`url(${song.cover})`
  }


  function updateProgressBar(e) {
    let currentMinutes;
    let currentSeconds ;
    if (isPlaying) { 
      const duration = e.srcElement.duration;
      const currentTime = e.srcElement.currentTime;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100; 
      progress.style.width = progressPercent + "%";
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60); 
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        musicTime.textContent = durationMinutes + ":" + durationSeconds;
      }
      // Calculate display for currentTime


      
      currentMinutes = Math.floor(currentTime / 60);
       currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (progress.style.width === '100%') { 
        video.pause()
        pauseSong()  
    }
    } 
    if (isPlaying) { 
      currentTime.innerHTML=''
          currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
          }
  }

  function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
    console.log(music.currentTime);
  
  }

  let speaker = true
  speakerIcon.addEventListener('click',(e)=>{ 
    if (speaker) {
      music.volume=0
      speaker=false
      speakerIcon.innerHTML=''
      speakerIcon.innerHTML=' <i class="fa-solid fa-volume-xmark relative top-[3px]" ></i>'
    }else{
      music.volume=1
      speakerIcon.innerHTML=''
      speakerIcon.innerHTML=' <i class="fa-solid fa-volume-high relative top-[3px]" ></i>' 
      speaker=true
    }
    fa-volume-xmark
  })

  music.addEventListener("timeupdate", updateProgressBar);
  progressContainer.addEventListener("click", setProgressBar);