import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
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

  useEffect(() => {
    parentStore.changeActivePage(Page.sellers);
  }, []);

  return (
    <>
      <MainContainer>
        <Container>
          <PageHeader text="SELLERS" />
          <TableHeader cellsContent={header} />
          {parentStore.loading ? (
            <Spinner />
          ) : (
            <TableBodySellers row={parentStore.selectedRow} elements={sellersStore.sellers} />
          )}
        </Container>
      </MainContainer>
      {sellersStore.showModal && <SellersModal headerText="Create an seller" />}
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
