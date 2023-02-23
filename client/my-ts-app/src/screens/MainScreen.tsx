import React from 'react';
import styled from 'styled-components';
import Modal from '../components/modals/Modal';

const MainScreen = () => {
  const modalOptions = [
    { text: 'Seller' },
    { text: 'Customer' },
    { text: 'Date' },
    { text: 'Amount' }
  ];
  return (
    <Container>
      <Modal title="Create an Invoice" options={modalOptions} />
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
