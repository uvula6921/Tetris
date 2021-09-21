import React from 'react';
import styled from 'styled-components';
import Block from './Block';

const Container = (props) => {
  const { view, handleMouseMove, gameOver, color } = props;

  return (
    <React.Fragment>
      {!gameOver ? (
        <Cont
          horizontalCells={view[0].length}
          verticalCells={view.length}
          onMouseMove={handleMouseMove}
        >
          {view.map((row) =>
            row.map((cell, i) => {
              return <Block key={i} type={cell[0]} color={color} />;
            })
          )}
        </Cont>
      ) : (
        <Cont gameOver={gameOver}>Game Over</Cont>
      )}
    </React.Fragment>
  );
};

export default Container;

const Cont = styled.div`
  display: ${(props) => (props.gameOver ? 'flex' : 'grid')};
  grid-template-rows: repeat(
    ${(props) => props.verticalCells},
    calc(360px / ${(props) => props.horizontalCells})
  );
  grid-template-columns: repeat(${(props) => props.horizontalCells}, 1fr);
  grid-gap: 1px;
  border: 2px solid #fff;
  width: 360px;
  height: 740px;
  background-color: ${(props) => (props.gameOver ? '#000' : '#222')};
  ${(props) =>
    props.gameOver &&
    'color: #fff; justify-content: center; align-items: center; font-size: 36px;'}
`;
