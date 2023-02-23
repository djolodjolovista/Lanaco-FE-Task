import React from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';

const OptionsMenu = () => {
  return (
    <MainContainer>
      <IconConatiner background="#00800070">
        <Icon icon="add" size="35" />
      </IconConatiner>
      <IconConatiner background="#ffff0075">
        <Icon icon="edit" size="25" />
      </IconConatiner>
      <IconConatiner background="#ff000073">
        <Icon icon="delete" size="35" />
      </IconConatiner>
    </MainContainer>
  );
};

export default OptionsMenu;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 1000;
  top: 150px;
  left: 37.5%;
  border: 2px solid black;
  width: 25%;
  border-radius: 16px;
  box-shadow: 3px 3px 7px rgb(0 0 0 / 60%);
`;

const IconConatiner = styled.div<{ background: string }>`
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 5px;
  border: 1px solid black;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.background};
  &:hover {
    background: #e6e6e6;
    color: blue;
  }
  min-height: 55px;
  width: 50%;
`;
