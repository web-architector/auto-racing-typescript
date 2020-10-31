export const startBtn = <HTMLButtonElement>document.createElement('button');
startBtn.classList.add('start', 'start__btn');
startBtn.innerText = 'Start';
export const score = <HTMLDivElement>document.querySelector('.score');
export const game = <HTMLDivElement>document.querySelector('.game');  // Игровое поле
export const gameRoad = <HTMLDivElement>document.querySelector('.gameRoad');  // Игровое поле
export const myCar = <HTMLDivElement>document.createElement('div'); // Машинка
myCar.classList.add('my-car');
export const videoBackground = <HTMLVideoElement>document.querySelector('.video');
videoBackground.playbackRate = 1;

const createGameOverBtn = (): HTMLButtonElement => {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add('game-over__btn');
  btn.innerHTML = '<p>Game over</p><p>New game?</p><p>Yes/No</p>';
  return btn;
};

export const gameOverBtn = createGameOverBtn();
