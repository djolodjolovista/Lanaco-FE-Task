import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';

const Sellers = () => {
  const header = ['Name', 'Adress', 'Active'];

  const test = [
    { companyName: 'Microsoft', hqAdress: 'Sarajevo', isActive: true },
    { companyName: 'Intel', hqAdress: 'London', isActive: false }
  ];
  return (
    <MainContainer>
      <Container>
        <PageHeader text="SELLERS" />
        <TableHeader cellsContent={header} />
        <TableBody type="SELLERS" elements={test} />
      </Container>
    </MainContainer>
  );
};

export default Sellers;

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
