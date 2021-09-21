export const HORIZONTAL_CELLS_COUNT = 10;
export const VERTICAL_CELLS_COUNT = 20;

export const setGrid = () => {
  const verticalArray = Array(VERTICAL_CELLS_COUNT);

  for (let i = 0; i < verticalArray.length; i++) {
    verticalArray[i] = Array(HORIZONTAL_CELLS_COUNT).fill([0, 'clear']);
  }

  return verticalArray;
};

export const checkCollision = (player, view, { x: xAxis, y: yAxis }) => {
  for (let y = 0; y < player.block.length; y += 1) {
    for (let x = 0; x < player.block.length; x += 1) {
      if (
        !view[y + player.position.y + yAxis] ||
        view[y + player.position.y + yAxis][x + xAxis][1] !== 'clear'
      ) {
        return true;
      }
    }
  }
};
