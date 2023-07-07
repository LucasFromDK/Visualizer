let soundInfo = [];
let soundName = [];
let currentName = 0
let sound = [];
let currentSound = 0;
let amplitude;
let fft;

function preload() {
sound[0] = loadSound("src/sounds/NCS_Skyhigh.mp3");
soundName[0] = "NCS Skyhigh"
sound[1] = loadSound("src/sounds/Rift.mp3");
soundName[1] = "NCS Rift"
sound[2] = loadSound("src/sounds/Drop In The Ocean.mp3");
soundName[2] = "NCS Drop In The Ocean"
sound[3] = loadSound("src/sounds/EXXO Tension NCS.mp3");
soundName[3] = "NCS EXXO Tension"
sound[4] = loadSound("src/sounds/ANGELPLAYA PULL UP.mp3");
soundName[4] = "NCS ANGELPLAYA Pull Up"
}

function setup() {
  console.log("Made By: https://github.com/LucasFromDK | 2023");
  //Controls
  playButton = createButton("Play").mousePressed(toggleMusic);
  nextButton = createButton("Next").mousePressed(playNext);
  volumeSlider = createSlider(0, 1, 0.1, 0.01);
  rateSlider = createSlider(0, 2, 1, 0.1);
  //Position of Controls
  playButton.position(5, windowHeight-playButton.height);
  nextButton.position(playButton.x+55, playButton.y);
  volumeSlider.position(nextButton.x+95, playButton.y);
  rateSlider.position(volumeSlider.x+260, playButton.y);
  //
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT(0, 256);
  amplitude = new p5.Amplitude();
  amplitude.setInput(sound[currentSound]);
}

function draw() {
  background(0);
  sound[currentSound].setVolume(volumeSlider.value());
  sound[currentSound].rate(rateSlider.value());
  fill("white");
  text("Volume: ", nextButton.x+50, playButton.y+14);
  text("Adjust Playback Rate: ", volumeSlider.x+140, playButton.y+14);
  text("Playback Rate: " + rateSlider.value(), volumeSlider.x+400, playButton.y+14)
  soundInfo = fft.analyze();
  fft.smooth(0.9);
  text("Current Song: " + soundName[currentName], playButton.x, playButton.y-5)
  
for(let i = 0; i < soundInfo.length; i++) {
  noFill();
  let vol = map(soundInfo[i], 0, 255, height/2, 0);
  strokeWeight(1);
  stroke(vol, 25, 255);
  let x = map(i, 0, 255, 0, width);
  line(x, height/2, x, vol);
  line(x, height/2, x, height-vol);
  }
}

function toggleMusic() {
  if(sound[currentSound].isPlaying()) {
    sound[currentSound].pause();
    playButton.html("Play");
  } else {
    sound[currentSound].play();
    playButton.html("Pause");
    console.log(sound[currentSound]);
  }
}

function playNext() {
  soundName[currentName]
  sound[currentSound].stop();
  if(currentSound == sound.length-1) {
    currentSound = 0;
    currentName = 0
    console.log(soundName[currentName])
  } else {
    currentSound++;
    currentName++;
    console.log(soundName[currentName])
  }
  playButton.html("Pause");
  sound[currentSound].play();
  console.log(sound[currentSound]);
}