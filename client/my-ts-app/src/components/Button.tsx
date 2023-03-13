import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  color: string;
  text: string;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <Container>
      <Text color={props.color} onClick={props.onClick}>
        {props.text}
      </Text>
    </Container>
  );
};

export default Button;

const Container = styled.div`
  display: flex;
`;

const Text = styled.button<{ color: string }>`
  color: black;
  background: ${(props) => `rgba(${props.color}, 0.5)`};
  border-radius: 5px;
  border: 2px solid ${(props) => `rgba(${props.color}, 1)`};
  width: 80px;
  &:hover {
    background: ${(props) => `rgba(${props.color}, 0.7)`};
  }
`;
