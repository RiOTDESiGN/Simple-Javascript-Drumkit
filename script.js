const drumkitContainer = document.getElementById("drumkit")
const display = document.getElementById("display");
const volumeSlider = document.getElementById("volume-slider");
const soundFolder = "sounds/"
const soundList = [
  {key: "1", fileName: "snap.wav"},
  {key: "2", fileName: "tink.wav"},
  {key: "3", fileName: "tom.wav"},
  {key: "4", fileName: "kick.wav"},
  {key: "5", fileName: "lohat.wav"},
  {key: "6", fileName: "ride.wav"},
  {key: "7", fileName: "snare.wav"},
  {key: "8", fileName: "clap.wav"},
  {key: "9", fileName: "hihat.wav"},
]

function drum(folder, fileInfo) {

  const button = document.createElement("button");
  display.textContent = "";

  const sound = new Audio(folder + fileInfo.fileName)

  button.addEventListener("mousedown", () =>  {
    display.textContent = fileInfo.fileName.replace(/\.[^.]+$/, "");
    playSound(sound);
  })

  return button
} 

const drumkitElements = soundList.map((soundInfo) => drum(soundFolder, soundInfo))

drumkitContainer.append(...drumkitElements)

window.addEventListener("keydown", (event) => {

  const soundFile = soundList.find((soundInfo) => soundInfo.key === event.key);


  if (!soundFile) return;

  const sound = new Audio(soundFolder + soundFile.fileName);
  playSound(sound);
});

function playSound(audioElement) {
  audioElement.volume = volumeSlider.value;
  audioElement.currentTime = 0
  audioElement.pause()
  audioElement.play()
}

// ************************************************************************ MOUSE WHEEL VOLUME SLIDER

window.addEventListener("wheel", (event) => {

  event.preventDefault();

  const scrollDirection = Math.sign(event.deltaY);

  if (scrollDirection > 0) {
    volumeSlider.stepDown();
  } else if (scrollDirection < 0) {
    volumeSlider.stepUp();
  }
});