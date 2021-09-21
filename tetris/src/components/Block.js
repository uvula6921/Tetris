import React from 'react';
import styled from 'styled-components';

const Block = (props) => {
  const { color, type } = props;

  return (
    <React.Fragment>
      <Square color={color} type={type}></Square>
    </React.Fragment>
  );
};

export default React.memo(Block);

const Square = styled.div`
  width: auto;
  background: ${(props) =>
    props.type === 0 ? 'rgba(0, 0, 0, 0.8)' : `rgba(${props.color}, 0.8)`};
  border: ${(props) => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: ${(props) =>
    props.type === 0 ? 'rgba(0, 0, 0, 0.8)' : `rgba(${props.color}, 0.1)`};
  border-right-color: ${(props) =>
    props.type === 0 ? 'rgba(0, 0, 0, 0.8)' : `rgba(${props.color}, 1)`};
  border-top-color: ${(props) =>
    props.type === 0 ? 'rgba(0, 0, 0, 0.8)' : `rgba(${props.color}, 1)`};
  border-left-color: ${(props) =>
    props.type === 0 ? 'rgba(0, 0, 0, 0.8)' : `rgba(${props.color}, 0.3)`};
`;
