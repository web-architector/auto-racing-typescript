import {videoBackground} from './elements';
import {SETTINGS} from "./config";

export const handlevideoBackground = ():void =>{
  SETTINGS.backgroundVideo ? videoBackground.play() : videoBackground.pause();
}
