import { observer } from 'mobx-react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomersModal from '../components/modals/CustomersModal';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';
import customersStore from '../stores/customers';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';

const Customers = () => {
  const header = ['Name', 'Surname', 'Adress', 'Age'];
  parentStore.changeActivePage(Page.customers);

  return (
    <>
      <MainContainer>
        <Container>
          <PageHeader text="CUSTOMERS" />
          <TableHeader cellsContent={header} />
          {parentStore.loading ? (
            <Spinner />
          ) : (
            <TableBody
              row={parentStore.selectedRow}
              type="CUSTOMERS"
              elements={customersStore.customers}
            />
          )}
        </Container>
        {customersStore.showModal && <CustomersModal type="customer" />}
      </MainContainer>
      <Outlet />
    </>
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
