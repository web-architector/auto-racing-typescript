import {gameOverBtn, gameRoad, myCar, startBtn} from "./elements";
import {SETTINGS} from "./config";
import {IControls} from "./types";
import {gameOver} from "./gameOver";

export const setEventListeners = (): void => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);
  gameOverBtn.addEventListener('click', gameOver);
}
const handleKeydown = (event: KeyboardEvent): void => {
  const key = event.key;
  const code = event.code;
  if (controlKeys.hasOwnProperty(key)) {
    event.preventDefault(); // убираем по умолчанию горизонтальный и вертикальный скрол при нажатии на стрелки
    controlKeys[key] = true;
    // return;
  }
  if (code === 'Space') { // pause game
    SETTINGS.paused = !SETTINGS.paused;
    SETTINGS.backgroundVideo = !SETTINGS.backgroundVideo;

    event.preventDefault();
  }
  if (code === 'KeyM') { // pause
    SETTINGS.audio = !SETTINGS.audio;
  }
  if (code === 'KeyY') { // New game after fail
    if (SETTINGS.paused || SETTINGS.start) return;
    gameOver();
  }
  if (code === 'KeyS') { // New game
    if (SETTINGS.score) return;
    startBtn.click();
  }
  if (code === 'KeyB') { // stop video background
    SETTINGS.backgroundVideo = ! SETTINGS.backgroundVideo;
  }
  if (code === 'NumpadAdd') { // speed Up
    SETTINGS.flowSpeed < 10 ? SETTINGS.flowSpeed++ : null;
  }
  if (code === 'NumpadSubtract') { //speed Down
    SETTINGS.flowSpeed > 1 ? SETTINGS.flowSpeed-- : null;
  }
};
const handleKeyup = (event: KeyboardEvent): void => {
  const key = event.key;
  event.preventDefault(); // убираем
  if (controlKeys.hasOwnProperty(key)) {
    event.preventDefault(); // убираем по умолчанию горизонтальный и вертикальный скрол при нажатии на стрелки
    controlKeys[key] = false;
  }
};
export const controlKeys: IControls = { // Объект состаяния нажатых стрелок и кнопок управления
  ArrowLeft: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowUp: false,
}

// Реализация движения нашей машинф
export const handleVehicleMove = (): void => { // реализация перемещения по осям X-Y
  const {ArrowLeft, ArrowRight, ArrowUp, ArrowDown} = controlKeys;
  if (ArrowLeft) {
    const estimatedX = SETTINGS.x - SETTINGS.flowSpeed;
    SETTINGS.x = estimatedX > 0 ? estimatedX : 0;
  }
  ;
  if (ArrowRight) {
    const estimatedX = SETTINGS.x + SETTINGS.flowSpeed;
    const maxX = gameRoad.offsetWidth - myCar.offsetWidth
    SETTINGS.x = estimatedX > maxX ? maxX : estimatedX;
  }
  ;
  if (ArrowUp) {
    const estimatedY = SETTINGS.y + SETTINGS.flowSpeed;
    const maxY = gameRoad.offsetHeight - myCar.offsetHeight
    SETTINGS.y = estimatedY > maxY ? maxY : estimatedY;
  }
  ;
  if (ArrowDown) {
    const estimatedY = SETTINGS.y - SETTINGS.flowSpeed;
    SETTINGS.y = estimatedY > 0 ? estimatedY : 0;
  }
  ;
  myCar.style.left = SETTINGS.x + 'px';
  myCar.style.bottom = SETTINGS.y + 'px';
}

