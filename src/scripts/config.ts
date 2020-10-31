import { gameRoad } from './elements';

export const ROAD_WIDTH = 500;
export const VEHICLE_WIDTH = 50;
export const VEHICLE_HEIGHT = 100;
export const MARKING_WIDTH = 10;
export const MARKING_HEIGHT = MARKING_WIDTH * 4;
export const TRAFFIC_LANES = 6; // четное (!) кол-во полос на всей дороге независимо от направления
export const COMPETITORS_COUNT = 6; // кол-во вариаций машин соперников
export const EXPLOSIVE_WIDTH = 75; // размер взрыва

type Settings = {
  start: boolean,
  score: number,
  flowSpeed: number,
  traffic: number,
  maxCompetitorsViews: number,
  paused: boolean,
  audio: boolean,
  backgroundVideo: boolean,
  x: number,
  y: number,
}
export const SETTINGS: Settings = {
  start: false,
  score: 0,
  flowSpeed: 5,  // скорость потока машин
  traffic: 3,
  maxCompetitorsViews: 5, // кол-во изображений соперников
  paused: false,
  backgroundVideo: true,
  audio: true,
  x: 0,
  y: 0
};
export const setStyles = (): void => {
  const roadStyles = gameRoad.style;
  roadStyles.setProperty('--roadWidth', ROAD_WIDTH + 'px');
  roadStyles.setProperty('--vehicleWidth', VEHICLE_WIDTH + 'px');
  roadStyles.setProperty('--vehicleHeight', VEHICLE_HEIGHT + 'px');
  roadStyles.setProperty('--markingWidth', MARKING_WIDTH + 'px');
  roadStyles.setProperty('--markingHeight', MARKING_HEIGHT + 'px');
  roadStyles.setProperty('--explosive-width', EXPLOSIVE_WIDTH + 'px');
};
