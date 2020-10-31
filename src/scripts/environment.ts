import {MARKING_HEIGHT, SETTINGS} from "./config";
import {gameRoad} from "./elements";

// рисование первоначальной осевой разделительной линии
export const initAxialMarking = (linesQuantity: number): HTMLDivElement[] => {
  //удаляем старую разметку от прошлой игры
  const oldMarkingLines: NodeListOf<HTMLDivElement> = document.querySelectorAll('.marking');
  oldMarkingLines.forEach(el=>el.parentNode?.removeChild(el));

  const markingLines = [];
  for (let i = 0; i < linesQuantity; i++) {
    const line = <HTMLDivElement>document.createElement('div');
    line.className = 'marking';
    const positionY = (- 5 * MARKING_HEIGHT * 1.5 + i * MARKING_HEIGHT * 1.5)
    line.style.top =  positionY + 'px';
    line.dataset.positionY = positionY.toString();
    gameRoad.appendChild(line);
    markingLines.push(line);
  }
  return markingLines;
}
// Реализация движения дороги, обочины, перспективы
export const handleEnvironmentMove = (lines: HTMLDivElement[]): void => {
  // let lines = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.marking'); // все прерывистые линии
  lines.forEach(line => {
    const positionY = parseInt(line.dataset.positionY as string);
    let newPositionY = positionY + SETTINGS.flowSpeed;
    line.dataset.positionY = newPositionY.toString();
    if (newPositionY >= document.documentElement.clientHeight) {
      newPositionY = - 5 * MARKING_HEIGHT * 1.5;
      line.dataset.positionY = newPositionY.toString(); // убираем за край экрана, чтобы выходили линии плавно из-за края
    }
    line.style.top = newPositionY + 'px';
  })
}
