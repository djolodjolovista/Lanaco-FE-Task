import { observer } from 'mobx-react';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../api/ApiRequests';
import Icon from '../../icons/Icon';
import customersStore from '../../stores/customers';
import invoicesStore from '../../stores/invoices';
import parentStore from '../../stores/parent';
import { Page } from '../../stores/parent';
import sellersStore from '../../stores/sellers';
import DeleteModal from '../modals/DeleteModal';
import Notification from '../Notification';

const OptionsMenu = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const createRow = () => {
    if (parentStore.activePage === Page.invoices) {
      invoicesStore.toggleModal();
    } else if (parentStore.activePage === Page.sellers) {
      sellersStore.toggleModal();
    } else if (parentStore.activePage === Page.customers) {
      customersStore.toggleModal();
    }
  };

  const deleteRow = async () => {
    if (parentStore.activePage === Page.invoices) {
      api.deleteInvoice(parentStore.selectedRow);
      await delay(700);
      parentStore.addSelectedRow('');
      invoicesStore.fetchInvoices();
      setShowDeleteModal(false);
    } else if (parentStore.activePage === Page.sellers) {
      if (!invoicesStore.checkSellersOnInvoices()) {
        //verification of the seller on the invoices
        api.deleteSeller(parentStore.selectedRow);
        await delay(700);
        parentStore.addSelectedRow('');
        sellersStore.fetchSellers();
        setShowDeleteModal(false);
      } else {
        notify();
      }
    } else if (parentStore.activePage === Page.customers) {
      if (!invoicesStore.checkCustomerOnInvoices()) {
        api.deleteCustomer(parentStore.selectedRow);
        await delay(700);
        parentStore.addSelectedRow('');
        customersStore.fetchCustomers();
        setShowDeleteModal(false);
      } else {
        notifyForCustomer();
      }
    }
  };

  const editRow = () => {
    if (parentStore.activePage === Page.invoices) {
      navigate(`${location.pathname}/${parentStore.selectedRow}`);
    } else if (parentStore.activePage === Page.sellers) {
      navigate(`${location.pathname}/${parentStore.selectedRow}`);
    } else if (parentStore.activePage === Page.customers) {
      navigate(`${location.pathname}/${parentStore.selectedRow}`);
    }
  };

  const notify = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="The seller exists on the invoice!" />
    ));

  const notifyForCustomer = () =>
    toast.custom((t) => (
      <Notification
        onClick={() => toast.dismiss(t.id)}
        text="The customer exists on the invoice!"
      />
    ));

  console.log('Location->>>>>', location.pathname);
  return (
    <>
      <MainContainer>
        <IconConatiner enabled={true} onClick={createRow} background="#00800070">
          <Icon icon="add" size="35" />
        </IconConatiner>
        <IconConatiner
          enabled={parentStore.enabledMenuOptions}
          onClick={editRow}
          background="#ffff0075">
          <Icon icon="edit" size="25" />
        </IconConatiner>
        <IconConatiner
          enabled={parentStore.enabledMenuOptions}
          onClick={() => setShowDeleteModal(true)}
          background="#ff000073">
          <Icon icon="delete" size="35" />
        </IconConatiner>
      </MainContainer>
      <Toaster position="top-right" reverseOrder={false} />
      {showDeleteModal && (
        <DeleteModal label="Are you sure ?" yes={deleteRow} no={() => setShowDeleteModal(false)} />
      )}
    </>
  );
};

export default observer(OptionsMenu);

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 1;
  top: 150px;
  left: 50%;
  margin-left: -106.5px;
  border: 2px solid black;
  width: 213px;
  border-radius: 16px;
  box-shadow: 3px 3px 7px rgb(0 0 0 / 60%);
`;

const IconConatiner = styled.div<{ background: string; enabled?: boolean }>`
  ${(props) =>
    !props.enabled
      ? `pointer-events: none; background: #e6e6e6;`
      : `background:${props.background};`}
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 5px;
  border: 1px solid black;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    background: #e6e6e6;
    color: blue;
  }
  min-height: 55px;
  width: 50%;
`;
