import { useState, useCallback } from 'react';
import { HORIZONTAL_CELLS_COUNT } from '../shared/Settings';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    block: [[0]],
    collided: false,
  });

  const updatePlayerPosition = ({ x, y, collided }) => {
    if (x != null) {
      setPlayer((prev) => ({
        ...prev,
        position: { x: x, y: (prev.position.y += y) },
        collided,
      }));
    } else {
      setPlayer((prev) => ({
        ...prev,
        position: { ...prev.position, y: (prev.position.y += y) },
        collided,
      }));
    }
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      block: [
        [1, 1],
        [1, 1],
      ],
      position: { x: HORIZONTAL_CELLS_COUNT / 2 - 1, y: 0 },
      collided: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer];
};
