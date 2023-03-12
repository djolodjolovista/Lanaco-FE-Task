import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';
import sellersStore from '../stores/sellers';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';
import Spinner from '../components/Spinner';
import SellersModal from '../components/modals/SellersModal';
import { Outlet } from 'react-router-dom';
import TableBodySellers from '../components/table/TableBodySellers';

const Sellers = () => {
  const header = ['Name', 'Adress', 'Active'];
  parentStore.changeActivePage(Page.sellers);

  return (
    <>
      <MainContainer>
        <Container>
          <PageHeader text="SELLERS" />
          <TableHeader cellsContent={header} />
          {parentStore.loading ? (
            <Spinner />
          ) : (
            <TableBodySellers
              row={parentStore.selectedRow}
              type="SELLERS"
              elements={sellersStore.sellers}
            />
          )}
        </Container>
      </MainContainer>
      {sellersStore.showModal && <SellersModal type="seller" />}
      <Outlet />
    </>
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
