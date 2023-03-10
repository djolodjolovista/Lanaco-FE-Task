import React from 'react';
import styled from 'styled-components';
import DeleteModal from '../components/modals/DeleteModal';
import Modal from '../components/modals/Modal';
import Notification from '../components/Notification';
import { toast, Toaster } from 'react-hot-toast';

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

  const notify = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="testiramo notifikaciju" />
    ));
  //<Modal title="Create an Invoice" options={modalOptions} />

  return (
    <Container>
      <button onClick={() => notify()}>test</button>
      <Toaster position="top-right" reverseOrder={false} />
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
