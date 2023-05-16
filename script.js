const drumkitContainer = document.getElementById("drumkit")
const display = document.getElementById("display");
const volumeSlider = document.getElementById("volume-slider");
const soundFolder = "sounds/"
const soundList = [
  {key: "7", fileName: "snap.wav"},
  {key: "8", fileName: "tink.wav"},
  {key: "9", fileName: "tom.wav"},
  {key: "4", fileName: "kick.wav"},
  {key: "5", fileName: "lohat.wav"},
  {key: "6", fileName: "ride.wav"},
  {key: "1", fileName: "snare.wav"},
  {key: "2", fileName: "clap.wav"},
  {key: "3", fileName: "hihat.wav"},
]

function drum(folder, fileInfo) {

  const button = document.createElement("button");
  button.id = fileInfo.fileName;
  display.textContent = "";

  const sound = new Audio(folder + fileInfo.fileName)

  button.addEventListener("mousedown", () =>  {
    display.textContent = fileInfo.fileName.replace(/\.[^.]+$/, "");
    button.classList.add("active");
    playSound(sound);
  })

  button.addEventListener("mouseup", () => {
    button.classList.remove("active");
    button.blur();
  });

  return button
} 

const drumkitElements = soundList.map((soundInfo) => drum(soundFolder, soundInfo))

drumkitContainer.append(...drumkitElements)

window.addEventListener("keydown", (event) => {
  const soundFile = soundList.find((soundInfo) => soundInfo.key === event.key);

  if (!soundFile) return;

  const elementToClick = document.getElementById(soundFile.fileName);
  if (elementToClick) {
    elementToClick.dispatchEvent(new Event("mousedown"));
    setTimeout(() => {
      elementToClick.dispatchEvent(new Event("mouseup"));
    }, 60);
  }
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