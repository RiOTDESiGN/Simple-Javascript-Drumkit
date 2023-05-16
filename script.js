const drumkitContainer = document.getElementById("drumkit");
const display = document.getElementById("display");
const volumeSlider = document.getElementById("volume-slider");
const soundFolder = "sounds/";
const soundList = [
  { key: "7", fileName: "snap.wav" },
  { key: "8", fileName: "tink.wav" },
  { key: "9", fileName: "tom.wav" },
  { key: "4", fileName: "kick.wav" },
  { key: "5", fileName: "lohat.wav" },
  { key: "6", fileName: "ride.wav" },
  { key: "1", fileName: "snare.wav" },
  { key: "2", fileName: "clap.wav" },
  { key: "3", fileName: "hihat.wav" },
];

let keysPressed = [];

function drum(folder, fileInfo) {
  const buttons = [];

  fileInfo.key.split("").forEach((key) => {
    const button = document.createElement("button");
    button.id = fileInfo.fileName;
    display.textContent = "";

    const sound = new Audio(folder + fileInfo.fileName);

    button.addEventListener("mousedown", () => {
      display.textContent = fileInfo.fileName.replace(/\.[^.]+$/, "");
      button.classList.add("active");
      playSound([sound]);
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove("active");
      button.blur();
    });

    buttons.push(button);
  });

  return buttons;
}

const drumkitElements = soundList.flatMap((soundInfo) => drum(soundFolder, soundInfo));

drumkitContainer.append(...drumkitElements);

window.addEventListener("keydown", (event) => {
  const soundFile = soundList.find((soundInfo) => soundInfo.key === event.key);

  if (!soundFile || keysPressed.includes(event.key)) return;

  keysPressed.push(event.key);

  const elementToClick = document.getElementById(soundFile.fileName);
  if (elementToClick) {
    elementToClick.dispatchEvent(new Event("mousedown"));
  }
});

window.addEventListener("keyup", (event) => {
  const soundFile = soundList.find((soundInfo) => soundInfo.key === event.key);

  if (!soundFile) return;

  const index = keysPressed.indexOf(event.key);
  if (index > -1) {
    keysPressed.splice(index, 1);
  }

  const elementToClick = document.getElementById(soundFile.fileName);
  if (elementToClick) {
    elementToClick.dispatchEvent(new Event("mouseup"));
  }
});

function playSound(audioElements) {
  audioElements.forEach((audioElement) => {
    audioElement.volume = volumeSlider.value;
    audioElement.currentTime = 0;
    audioElement.pause();
    audioElement.play();
  });
}

// Mouse Wheel Volume Slider
window.addEventListener("wheel", (event) => {
  event.preventDefault();

  const scrollDirection = Math.sign(event.deltaY);

  if (scrollDirection > 0) {
    volumeSlider.stepDown();
  } else if (scrollDirection < 0) {
    volumeSlider.stepUp();
  }
});
