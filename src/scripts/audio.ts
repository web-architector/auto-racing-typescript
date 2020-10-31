// воспроизведение музыки
import { SETTINGS } from './config';

// export const audio = <HTMLAudioElement>document.createElement('audio');
export const audio = new Audio();
audio.src = 'assets/audio/audio.mp3';
audio.loop = true;


export const handleAudio = (forceStop: boolean = false): void => {
  if (SETTINGS.audio && !forceStop) {
    audio.play().then();
  } else {
    audio.pause();
  }
};
