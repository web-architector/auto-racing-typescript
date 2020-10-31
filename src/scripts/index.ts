import { gameOverBtn, gameRoad, myCar, score, startBtn } from './elements';
import { MARKING_HEIGHT, setStyles, SETTINGS, VEHICLE_HEIGHT } from './config';
import { handleVehicleMove, setEventListeners } from './controls';
import { getElementQuantity } from './utils';
import { handleCompetitorsMove, initCompetitors } from './competitors';
import { handleEnvironmentMove, initAxialMarking } from './environment';
import { handleAudio } from './audio';
import { handlevideoBackground } from './video';
import { handleScore } from './score';


export const playGame = (competitors: HTMLDivElement[], markingLines: HTMLDivElement[]): void => {

  if (!SETTINGS.paused) {
    handleScore();
    handleVehicleMove();
    handleCompetitorsMove(competitors);
    handleEnvironmentMove(markingLines);
    handleAudio();
  } else {
    handleAudio(true); // force to off music upon Space pressed
  }
  handlevideoBackground();
  const requestID = requestAnimationFrame(() => playGame(competitors, markingLines));
  !SETTINGS.start && cancelAnimationFrame(requestID); // выход из playGAme если игра окончена
};

const startGame = (): void => {

  startBtn.classList.add('hide');
  myCar.classList.remove('explosive');
  gameOverBtn.classList.add('hide');
  SETTINGS.start = true;
  SETTINGS.paused = false;
  SETTINGS.x = myCar.offsetLeft;
  SETTINGS.y = myCar.offsetHeight;


  // ширина линии разметки
  const markingLines = initAxialMarking(getElementQuantity(MARKING_HEIGHT)); // рисование первоначальной осевой разделительной линии
  // Отрисовка первоначального расположения машин соперников в момент старта игры
  const competitors = initCompetitors(getElementQuantity(VEHICLE_HEIGHT * SETTINGS.traffic));
  requestAnimationFrame(() => playGame(competitors, markingLines));
};

const initGame = (): void => {
  gameRoad.append(myCar);  // показать нашу машину на старте
  initAxialMarking(150); // только на первоначальной заставке - потом удаляем

  startBtn.addEventListener('click', startGame);
  gameRoad.append(startBtn);
  score.innerHTML = 'SCORE: ' + SETTINGS.score;

  setEventListeners();
  setStyles();

};
initGame();
