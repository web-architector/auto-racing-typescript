import { COMPETITORS_COUNT, ROAD_WIDTH, SETTINGS, TRAFFIC_LANES, VEHICLE_WIDTH } from './config';
import { gameOverBtn, gameRoad, myCar } from './elements';
import { randomIntRange, randomRange } from './utils';
import { handleAudio } from './audio';


/* Отрисовка первоначального расположения машин соперников в момент старта игры
* vehicleQuantity - возможное кол-во машин на данной странице исходя из высоты экрана
* */
export const initCompetitors = (vehicleQuantity: number): HTMLDivElement[] => {
  // удаляем старые машины с прошлой игры
  const oldCompetitors: NodeListOf<HTMLDivElement> = document.querySelectorAll('.competitor');
  console.log('###: Removed old competitors= ', oldCompetitors.length);
  oldCompetitors.forEach((el => el?.parentNode?.removeChild(el)));


  const competitors = [];
  for (let i = 0; i < vehicleQuantity; i++) {
    const competitor = <HTMLDivElement>document.createElement('div');
    competitor.className = 'competitor';
    // const imageNo:number = Math.floor(Math.random() * 5)+1;
    const positionY = -100 * SETTINGS.traffic * (i + 1); // пока что помещаем за пределами экрана
    competitor.dataset.positionY = positionY.toString();
    competitor.style.top = positionY + 'px';
    setCompetitorNewStyle(competitor);
    gameRoad.append(competitor);
    competitors.push(competitor);
  }
  return competitors;
};

// вычисляет точное положение машины на полосе в зависимости от кол-ва полос
const assignLane = (roadWidth: number, lanes: number, vehicleWidth: number): number => {
  const laneWidth = roadWidth / lanes;
  const laneOffset = (laneWidth - vehicleWidth) / 2;
  return randomIntRange(0, lanes - 1) * laneWidth + laneOffset;

};

// задаем стили для машин
const setCompetitorNewStyle = (competitor: HTMLDivElement): void => {
  // competitor.style.width = VEHICLE_WIDTH + 'px';
  competitor.classList.remove('explosive');
  // меняем позиционирование машины на дороге на новом экране
  competitor.style.left = assignLane(ROAD_WIDTH, TRAFFIC_LANES, VEHICLE_WIDTH) + 'px';

  competitor.style.backgroundImage = `url('assets/images/competitor${randomIntRange(1, COMPETITORS_COUNT)}.png')`;
  competitor.dataset.currentSpeed = (SETTINGS.flowSpeed * randomRange(.7, 1.3)).toString(); // присаваиваем рандомную скорость движения

};

// выводим изображения 2-х взрывов
const makeExplosive = (vehicles: HTMLDivElement[]): void => {
  vehicles.forEach(vehicle => {
    vehicle.classList.add('explosive');
    vehicle.dataset.currentSpeed = (SETTINGS.flowSpeed).toString(); // после взрыва - скорость сброшена

  });
};

// Проверка наезда нашей машины на соперника
const isAccident = (firstCar: HTMLDivElement, otherCar: HTMLDivElement, gap: number = VEHICLE_WIDTH * 0.15): boolean => {
  const firstCarRect: DOMRect = firstCar.getBoundingClientRect();
  const otherCarRect: DOMRect = otherCar.getBoundingClientRect();
  return firstCarRect.bottom > 0 && otherCarRect.bottom > 0 // машинки за пределами вь.порта не рассматриваем
    && firstCarRect.top + gap < otherCarRect.bottom  // наезд снизу
    && firstCarRect.right - gap > otherCarRect.left    // наезд слева направо
    && firstCarRect.left + gap < otherCarRect.right    // наезд справа налево
    && firstCarRect.bottom - gap > otherCarRect.top;    // наезд сверзу
};

// @ts-ignore
const stopGame = (): void => {
  console.log('###: game over= ', 666);
  gameOverBtn.classList.remove('hide');
  SETTINGS.audio = false;
  SETTINGS.start = false;
  handleAudio(true);
  gameRoad.append(gameOverBtn);
};
/*
* Реализация рендеринга машин-соперников
* */
export const handleCompetitorsMove = (competitors: HTMLDivElement[]): void => {
  // let competitors = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.competitor'); // все соперники
  competitors.forEach((competitor, index_1) => {
    if (isAccident(myCar, competitor)) {
      console.log(`###: Booom!!! My car crashed into ${index_1}`);
      makeExplosive([competitor, myCar]);
      stopGame();
      return;
    }
    competitors.forEach((otherCompetitor, index_2) => {
      if (index_1 === index_2) return;
      if (isAccident(competitor, otherCompetitor, 0)) {
        console.log(`###: Vehicle ${index_1} crashed into ${index_2}`);
        makeExplosive([competitor, otherCompetitor]);

      }
    });
    const positionY = parseInt(competitor.dataset.positionY as string);
    let newPositionY = positionY + parseInt(competitor.dataset.currentSpeed as string);
    competitor.dataset.positionY = newPositionY.toString();
    if (newPositionY >= document.documentElement.clientHeight) { // машинка переместилась ниже viewport'a
      // newPositionY = -100 * SETTINGS.traffic * (i + 1); // пока что помещаем за пределами экрана
      newPositionY = -100; // пока что помещаем за пределами экрана
      competitor.dataset.positionY = newPositionY.toString(); // убираем за край экрана, чтобы выходили линии плавно из-за края
      setCompetitorNewStyle(competitor);
    }
    competitor.style.top = newPositionY + 'px';
  });
};
