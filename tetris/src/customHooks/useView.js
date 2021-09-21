import { useState, useEffect } from 'react';
import { setGrid } from '../shared/Settings';

export const useView = (player, resetPlayer) => {
  const [view, setView] = useState(setGrid());
  const [clearedRowsCount, setClearedRowsCount] = useState(0);

  useEffect(() => {
    setClearedRowsCount(0);

    const clearRows = (newView) =>
      newView.reduce((acc, cur) => {
        if (cur.findIndex((cell) => cell[0] === 0) === -1) {
          setClearedRowsCount((prev) => prev + 1);
          acc.unshift(new Array(newView[0].length).fill([0, 'clear']));
          return acc;
        }
        acc.push(cur);
        return acc;
      }, []);

    const updateView = (prev) => {
      const newView = prev.map((row) => {
        return row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell));
      });

      player.block.forEach((row, y) => {
        row.forEach((value, x) => {
          newView[y + player.position.y][x + player.position.x] = [
            value,
            `${player.collided ? 'merged' : 'clear'}`,
          ];
        });
      });

      if (player.collided) {
        resetPlayer();
        return clearRows(newView);
      }
      return newView;
    };

    setView((prev) => updateView(prev));
  }, [player, resetPlayer]);

  return [view, setView, clearedRowsCount];
};
