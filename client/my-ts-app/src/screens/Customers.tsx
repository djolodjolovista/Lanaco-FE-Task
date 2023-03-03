import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';
import customersStore from '../stores/customers';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';

const Customers = () => {
  const header = ['Name', 'Surname', 'Adress', 'Age'];
  parentStore.changeActivePage(Page.customers);

  return (
    <MainContainer>
      <Container>
        <PageHeader text="CUSTOMERS" />
        <TableHeader cellsContent={header} />
        <TableBody type="CUSTOMERS" elements={customersStore.customers} />
      </Container>
    </MainContainer>
  );
};

export default observer(Customers);

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
