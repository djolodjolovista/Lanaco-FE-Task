import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menu from '../components/menus/Menu';
import OptionsMenu from '../components/menus/OptionsMenu';
import PageHeader from '../components/PageHeader';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';
import invoicesStore from '../stores/invoices';
import { observer } from 'mobx-react';
import parentStore from '../stores/parent';
import { Page } from '../stores/parent';
import { useSearchParams, Outlet } from 'react-router-dom';
import Modal from '../components/modals/Modal';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import Pagination from '../components/Pagination';

const Invoices = () => {
  const header = ['Seller', 'Customer', 'Date', 'Amount'];
  parentStore.changeActivePage(Page.invoices);

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
            <TableBody
              row={parentStore.selectedRow}
              type="INVOICES"
              elements={invoicesStore.invoices}
            />
          )}
        </Container>
      </MainContainer>
      {invoicesStore.showModal && <Modal type="Invoices" />}
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
