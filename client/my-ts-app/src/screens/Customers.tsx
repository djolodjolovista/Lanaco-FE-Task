import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomersModal from '../components/modals/CustomersModal';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';
import TableBodyCustomers from '../components/table/TableBodyCustomers';
import TableHeader from '../components/table/TableHeader';
import customersStore from '../stores/customers';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';

const Customers = () => {
  const header = ['Name', 'Surname', 'Adress', 'Age'];
  useEffect(() => {
    parentStore.changeActivePage(Page.customers);
  }, []);

  return (
    <>
      <MainContainer>
        <Container>
          <PageHeader text="CUSTOMERS" />
          <TableHeader cellsContent={header} />
          {parentStore.loading ? (
            <Spinner />
          ) : (
            <TableBodyCustomers row={parentStore.selectedRow} elements={customersStore.customers} />
          )}
        </Container>
      </MainContainer>
      {customersStore.showModal && <CustomersModal headerText="Create an customer" />}
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
