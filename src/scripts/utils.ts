// считает сколько влезет на страницу элементов заданной высоты (нужно для вычисления кол-ва линий разметки)
export const getElementQuantity = (elementHeight: number): number => {
  return document.documentElement.clientHeight / elementHeight + 1;
}

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const randomIntRange = (min: number, max: number): number => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

