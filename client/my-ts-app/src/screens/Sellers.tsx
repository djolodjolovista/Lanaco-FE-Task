import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';
import sellersStore from '../stores/sellers';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';

const Sellers = () => {
  const header = ['Name', 'Adress', 'Active'];
  parentStore.changeActivePage(Page.sellers);

  return (
    <MainContainer>
      <Container>
        <PageHeader text="SELLERS" />
        <TableHeader cellsContent={header} />
        <TableBody row="test" type="SELLERS" elements={sellersStore.sellers} />
      </Container>
    </MainContainer>
  );
};

export default observer(Sellers);

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
