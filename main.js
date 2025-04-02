const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const volumeSlider = document.querySelector(".volume-slider");
const seekSlider = document.querySelector(".seek-slider");
const coverImage = document.querySelector(".cover-img");
const currentTimeDisplay = document.querySelector(".current-time");
const totalTimeDisplay = document.querySelector(".total-time");
const singerName = document.querySelector(".singer-name");
const musicName = document.querySelector(".music-name");

console.log(audio)
// LIST OF OUR MUSICS INFORMATION
const playList = [
  {
    singerName: "Abdoul Pit",
    musicName: "singer name 1",
    audioSrc: "./assets/1-music.mp3",
    coverSrc: "./assets/1-cover.jpg",
  },
  {
    singerName: "Json Jafari",
    musicName: "singer name 2",
    audioSrc: "./assets/2-music.mp3",
    coverSrc: "./assets/2-cover.jpg",
  },
  {
    singerName: "Anjelina Habibi",
    musicName: "singer name 3",
    audioSrc: "./assets/3-music.mp3",
    coverSrc: "./assets/3-cover.jpg",
  },
];

let currentIndex = 0;
let isPlaying = false;

// LOAD CURRENT MUSIC



const loadAudio=()=>{
  const track=playList[currentIndex];
  coverImage.src=track.coverSrc;
 musicName.textContent=track.musicName;
singerName.textContent=track.singerName;
audio.src=track.audioSrc;  
if(isPlaying){
  playhandler()}
  }


const playhandler=()=>{
const playbuttonIcon=playPauseButton.firstElementChild;
if(isPlaying){
  audio.pause();
  coverImage.classList.remove("cover-animation");
  playbuttonIcon.classList.replace("fa-pause","fa-play");
}else{
  audio.play()
  coverImage.classList.add("cover-animation")
 playbuttonIcon.classList.replace("fa-play","fa-pause");
  }
isPlaying=!isPlaying;
}


const volumhandler=()=>{
audio.volume=volumeSlider.value;
} 

const seekhandeler=()=>{
  const newTime=audio.duration*(seekSlider.value/100);
  audio.currentTime=newTime;
  }


  nextButton.addEventListener("click",()=>{
    console.log("mmm")
     currentIndex+=1;
    if(currentIndex>playList.length-1){
      currentIndex=0;}
   playPauseButton.firstElementChild.classList.replace("fa-play","fa-pause");
   isPlaying=true;
    loadAudio();
    })


  prevButton.addEventListener("click",()=>{
    console.log("mmm")
     currentIndex-=1;
     if(currentIndex<0){
      currentIndex=playList.length-1;
     }
  playPauseButton.firstElementChild.classList.replace("fa-play","fa-pause");
  isPlaying ? true:false;

     loadAudio();
  });

  
  
  audio.addEventListener("ended",()=>{
    isPlaying=false;
  playPauseButton.firstElementChild.classList.replace("fa-pause","fa-play");
})


audio.addEventListener("timeupdate",()=>{
  const currentTime=audio.currentTime;
  const totaltim=audio.duration;
  const timout=totaltim-currentTime;
  const percentage=(currentTime/totaltim)*100;;
 if(percentage){
    seekSlider.value=percentage;
  }
  if(currentTime&&totaltim){
  currentTimeDisplay.textContent=formatTime(currentTime);
  totalTimeDisplay.textContent=  formatTime(timout);
 }
 
});




const formatTime=(time)=>{
 const min=Math.floor(time/60);
 const sec=Math.floor(time % 60);
return ( `${min<10?"0"+min:min}:${sec<10 ?0:""}${sec}`) 
  }

  

document.addEventListener("DOMContentLoaded",loadAudio);
seekSlider.addEventListener("input",seekhandeler);
volumeSlider.addEventListener("input",volumhandler);

playPauseButton.addEventListener("click",playhandler)
loadAudio();
