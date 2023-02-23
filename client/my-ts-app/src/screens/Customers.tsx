import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';

const Customers = () => {
  const header = ['Name', 'Surname', 'Adress', 'Age'];

  const test = [
    { name: 'Nikola', surname: 'Nikolic', adress: 'V.R.Putnika 43', age: 32 },
    { name: 'Petar', surname: 'Petrovic', adress: 'V.R.Putnika 53', age: 52 }
  ];
  return (
    <MainContainer>
      <Container>
        <PageHeader text="CUSTOMERS" />
        <TableHeader cellsContent={header} />
        <TableBody type="CUSTOMERS" elements={test} />
      </Container>
    </MainContainer>
  );
};

export default Customers;

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
