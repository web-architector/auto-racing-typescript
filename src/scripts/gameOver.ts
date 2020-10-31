import {SETTINGS} from "./config";
import {gameOverBtn, startBtn} from "./elements";

export const gameOver = ():void =>{
  SETTINGS.audio = !SETTINGS.audio;
  SETTINGS.score = 0;
  startBtn.classList.remove('hide');
  gameOverBtn.classList.add('hide');
}
