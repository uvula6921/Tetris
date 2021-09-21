import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Board from '../components/Board';
import bg from '../img/bg.png';

import { setGrid, checkCollision } from '../shared/Settings';

import { usePlayer } from '../customHooks/usePlayer';
import { useView } from '../customHooks/useView';
import { useInterval } from '../customHooks/useInterval';

const MainPage = (props) => {
  const [score, setScore] = useState(0);
  const [blockDropInterval, setBlockDropInterval] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const xAxis = useRef(4);
  const [color, setColor] = useState(null);

  const [player, updatePlayerPosition, resetPlayer] = usePlayer();
  const [view, setView, clearedRowsCount] = useView(player, resetPlayer);

  useEffect(() => {
    if (clearedRowsCount > 0) {
      setScore((prev) => prev + clearedRowsCount);
    }
  }, [clearedRowsCount]);

  const colorArray = [
    '255, 190, 11',
    '251, 86, 7',
    '255, 0, 110',
    '131, 56, 236',
    '58, 134, 255',
  ];

  const startGame = () => {
    setView(setGrid());
    resetPlayer();
    setScore(0);
    setGameOver(false);
    setBlockDropInterval(150);
    setColor(colorArray[Math.floor(Math.random() * colorArray.length)]);
  };

  const movePlayer = (xAxis) => {
    if (!checkCollision(player, view, { x: xAxis, y: 0 })) {
      updatePlayerPosition({ x: xAxis, y: 0 });
    }
  };

  const drop = () => {
    if (!checkCollision(player, view, { x: xAxis.current, y: 1 })) {
      updatePlayerPosition({ x: null, y: 1, collided: false });
    } else {
      if (player.position.y < 1) {
        setGameOver(true);
        setBlockDropInterval(null);
      }
      updatePlayerPosition({ x: null, y: 0, collided: true });
    }
  };

  const handleMouseMove = (e) => {
    if (!gameOver) {
      const xMove = Math.floor(
        (e.clientX - e.target.parentElement.offsetLeft) / 36
      );
      if (xMove < 0) {
        xAxis.current = 0;
      } else if (xMove >= 9) {
        xAxis.current = 8;
      } else {
        xAxis.current = xMove;
      }
      if (xAxis.current >= 0 && xAxis.current < 9) {
        movePlayer(xAxis.current);
      }
    }
  };

  useInterval(() => {
    drop();
  }, blockDropInterval);

  return (
    <BackGround>
      <Grid alignItems="center">
        <Container
          view={view}
          handleMouseMove={handleMouseMove}
          gameOver={gameOver}
          color={color}
        />
      </Grid>
      <Grid alignItems="flex-start" marginLeft="50px">
        <Board score={score} gameOver={gameOver} startGame={startGame} />
      </Grid>
    </BackGround>
  );
};

export default MainPage;

const BackGround = styled.div`
  background-image: url(${bg});
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 145px;
  box-sizing: border-box;
`;

const Grid = styled.div`
  display: flex;
  align-items: ${(props) => props.alignItems};
  margin-left: ${(props) => props.marginLeft};
  height: 740px;
`;
