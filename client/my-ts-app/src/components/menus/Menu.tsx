import React from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';

const Menu = () => {
  return (
    <MainContainer>
      <IconConatiner>
        <Icon icon="invoices" />
      </IconConatiner>
      <IconConatiner>
        <Icon icon="sellers" />
      </IconConatiner>
      <IconConatiner>
        <Icon icon="customers" />
      </IconConatiner>
    </MainContainer>
  );
};

export default Menu;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  width: 78px;
  border-radius: 16px;
`;

const IconConatiner = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 40px;
  &:hover {
    background: #e6e6e6;
    color: blue;
  }
  border-radius: 50%;
`;
