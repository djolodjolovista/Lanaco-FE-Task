import React from 'react';
import styled from 'styled-components';
import DeleteModal from '../components/modals/DeleteModal';
import Modal from '../components/modals/Modal';
import Notification from '../components/Notification';

const MainScreen = () => {
  const deleteModalOptions = {
    yes: () => null,
    no: () => null,
    label: 'Are you sure?'
  };

  const modalOptions = [
    { text: 'Seller' },
    { text: 'Customer' },
    { text: 'Date' },
    { text: 'Amount' }
  ];
  //<Modal title="Create an Invoice" options={modalOptions} />

  return (
    <Container>
      <Notification text="Date in future is not possible!" />
    </Container>
  );
};

export default MainScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CalculatorContainer = styled.div``;

const Title = styled.h1`
  color: red;
`;

const Footer = styled.div``;
