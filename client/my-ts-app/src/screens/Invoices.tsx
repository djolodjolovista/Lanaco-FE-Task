import React, { useEffect } from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import TableHeader from '../components/table/TableHeader';
import invoicesStore from '../stores/invoices';
import { observer } from 'mobx-react';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';
import { Outlet } from 'react-router-dom';
import InvoicesModal from '../components/modals/InvoicesModal';
import Spinner from '../components/Spinner';
import TableBodyInvoices from '../components/table/TableBodyInvoices';

const Invoices = () => {
  const header = ['Seller', 'Customer', 'Date', 'Amount'];
  useEffect(() => {
    parentStore.changeActivePage(Page.invoices);
  }, []);

  /*useEffect(() => {
    invoicesStore.fetchInvoices();
  }, [numberOfPages]);*/

  return (
    <>
      <MainContainer>
        <Container>
          <PageHeader text="INVOICES" />
          <TableHeader cellsContent={header} />
          {parentStore.loading ? (
            <Spinner />
          ) : (
            <TableBodyInvoices row={parentStore.selectedRow} elements={invoicesStore.invoices} />
          )}
        </Container>
      </MainContainer>
      {invoicesStore.showModal && <InvoicesModal headerText="Create an invoice" />}
      <Outlet />
    </>
  );
};

export default observer(Invoices);

const MainContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
