import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import parentStore from '../../stores/parent';
import { Page } from '../../stores/parent';

const Menu = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <IconConatiner
        onClick={() => {
          navigate('/invoices');
          parentStore.changeActivePage(Page.invoices);
        }}
        active={parentStore.currentPage === Page.invoices}>
        <Icon icon="invoices" />
      </IconConatiner>

      <IconConatiner
        onClick={() => {
          navigate('/sellers');
          parentStore.changeActivePage(Page.sellers);
        }}
        active={parentStore.currentPage === Page.sellers}>
        <Icon icon="sellers" />
      </IconConatiner>

      <IconConatiner
        onClick={() => {
          navigate('/customers');
          parentStore.changeActivePage(Page.customers);
        }}
        active={parentStore.currentPage === Page.customers}>
        <Icon icon="customers" />
      </IconConatiner>
    </MainContainer>
  );
};

export default observer(Menu);

const MainContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 150px;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  width: 78px;
  border-radius: 16px;
  box-shadow: 3px 3px 7px rgb(0 0 0 / 60%);
`;

const IconConatiner = styled.div<{ active: boolean }>`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 40px;
  ${(props) =>
    props.active &&
    `background: #e6e6e6;
  color: blue;`}
  &:hover {
    background: #e6e6e6;
    color: blue;
    cursor: pointer;
  }
  border-radius: 50%;
`;
