// вывод очков

import {score} from "./elements";
import {SETTINGS} from "./config";

export const handleScore = (): void =>{
  SETTINGS.score += SETTINGS.flowSpeed ;
  // score.innerHTML = `SCORE: ${SETTINGS.score} SPEED: ${SETTINGS.flowSpeed}`
  score.innerHTML = `<span>SCORE: ${SETTINGS.score}</span><span>SPEED: ${SETTINGS.flowSpeed}</span>`
}
