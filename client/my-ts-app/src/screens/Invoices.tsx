import React from 'react';
import styled from 'styled-components';
import Menu from '../components/menus/Menu';
import OptionsMenu from '../components/menus/OptionsMenu';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';

const Invoices = () => {
  const header = ['Seller', 'Customer', 'Date', 'Amount'];

  const test = [
    {
      id: '0',
      sellerName: 'Microsoft',
      customerName: 'Marko Markovic',
      date: '21.2.2022',
      amount: 2000
    },
    {
      id: '1',
      sellerName: 'Apple',
      customerName: 'Nikola Markovic',
      date: '22.2.2022',
      amount: 3000
    }
  ];
  return (
    <MainContainer>
      <Container>
        <PageHeader text="INVOICES" />
        <TableHeader cellsContent={header} />
        <TableBody type="INVOICES" elements={test} />
      </Container>
    </MainContainer>
  );
};

export default Invoices;

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
