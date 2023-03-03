import React from 'react';
import styled from 'styled-components';
import Icon from '../icons/Icon';

interface NotificationProps {
  text: string;
  color?: string;
}

const Notification = ({ color = '218, 114, 119', text }: NotificationProps) => {
  return (
    <Container color={color}>
      <IconConatiner>
        <Icon icon="delete" />
      </IconConatiner>
      <Text>{text}</Text>
    </Container>
  );
};

export default Notification;

const Container = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 115px;
  border: 2px solid black;
  width: 270px;
  border-radius: 15px;
  border: 2px solid ${(props) => `rgba(${props.color}, 1)`};
  background: ${(props) => `rgba(${props.color}, 0.2)`};
`;

const Text = styled.span`
  margin-top: 25px;
  margin-bottom: 25px;
`;

const IconConatiner = styled.div`
  height: 15px;
  margin-right: 10px;
  right: -5px;
  top: 3px;
  position: absolute;
  &:hover {
    color: red;
  }
`;
