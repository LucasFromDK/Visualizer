let soundInfo = []
let sound;
let amplitude;
let fft

function preload() {
sound = loadSound("src/audio/Sky High.mp3")
}

function setup() {
  sound.play()
  sound.setVolume(0.1)
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT(0, 256)
  amplitude = new p5.Amplitude()
  amplitude.setInput(sound)
}

function draw() {
  background(0);
  soundInfo = fft.analyze()
  fft.smooth(0.9)
  
for(let i = 0; i < soundInfo.length; i++) {
  noFill()
  let vol = map(soundInfo[i], 0, 255, height/2, 0)
  strokeWeight(1)
  stroke(vol, 25, 255)
  let x = map(i, 0, 255, 0, width)
  line(x, height/2, x, vol)
  line(x, height/2, x, height-vol)
}
 
  if(soundInfo.length > width) {
    soundInfo.splice(0, 1)
  }
}