import React from 'react';
import styled from 'styled-components';

const Board = (props) => {
  const { score, gameOver, startGame } = props;

  return (
    <Cont>
      <Start onClick={startGame}>{gameOver ? 'RESTART' : 'GAME START'}</Start>
      <Score>SCORE : {score}</Score>
    </Cont>
  );
};

export default Board;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  height: 140px;
`;

const Score = styled.div`
  width: 100%;
  height: 35%;
  background-color: #555;
  border: 2px solid #fff;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Start = styled.button`
  width: 100%;
  height: 35%;
  background-color: #000;
  border: 2px solid #fff;
  justify-content: center;
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 20px;
  padding: 0;
  box-sizing: content-box;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
`;
