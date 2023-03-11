import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Button from '../Button';
import invoicesStore from '../../stores/invoices';
import InvoiceFormModal from './InvoiceFormModal';
import { observer } from 'mobx-react';
import moment from 'moment';
import { api } from '../../api/ApiRequests';
import { Invoice } from '../../stores/invoices';
import parentStore from '../../stores/parent';
import type { DatePickerProps } from 'antd';
//import { DatePicker, Space } from 'antd';
import DatePicker from '../DatePicker';
import sellersStore from '../../stores/sellers';
import customersStore from '../../stores/customers';
import { toast, Toaster } from 'react-hot-toast';
import Notification from '../Notification';
moment.suppressDeprecationWarnings = true;

interface ModalProps {
  type: string;
  //options: { text: string; onClick: (e: React.ChangeEvent) => void }[];
  options?: { text: string }[];
}

const Modal = (props: ModalProps) => {
  const [seller, setSeller] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('ID->>>>', id);
  const onChange = (dateString: any) => {
    console.log(date, dateString);
    setDate(moment(dateString).toString());
  };
  const fetchData = async () => {
    let data: Invoice = {
      sellerName: '',
      customerName: '',
      date: new Date(),
      amount: 0,
      sellerId: '',
      customerId: ''
    };
    if (id) {
      data = (await api.getInvoice(id)).data;
      setSeller(data.sellerName);
      setCustomer(data.customerName);
      setDate(moment(data.date).format('DD.MM.YYYY'));
      setAmount(data.amount);
    } else {
      setSeller('');
      setCustomer('');
      setDate(moment().format('DD.MM.YYYY'));
      setAmount(0);
    }
  };
  useEffect(() => {
    //id && invoicesStore.getInvoice(id);
    fetchData();
  }, []);
  console.log('Invoice->>>>', invoicesStore.invoice);
  console.log('seller->>>>', seller);
  //if (props.type === 'INVOICE') {
  //setData(invoicesStore.invoice);
  // }
  const saveForm = async () => {
    const body = {
      sellerName: seller,
      customerName: customer,
      date: date,
      amount: amount
    };
    if (id) {
      if (!Number.isNaN(body.amount) && body.amount !== 0) {
        api.updateInvoice(id, body);
        await delay(600); //update 'put' method need more time for execution, after that we refresh data
        invoicesStore.fetchInvoices();
        parentStore.addSelectedRow('');
        navigate('/invoices');
      } else {
        notify();
      }
    } else {
      if (sellersStore.checkSellerIsActive(seller)) {
        api.createInvoice(body);
        await delay(400); //create 'post' method need more time for execution, after that we refresh data
        invoicesStore.fetchInvoices();
        parentStore.addSelectedRow('');
        invoicesStore.toggleModal();
      } else {
        notifyNotActiveSeller();
      }
    }
  };
  const discardForm = () => {
    if (id) {
      navigate('/invoices');
    } else {
      invoicesStore.toggleModal();
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const notify = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="Amount can't be 0 or empty!" />
    ));
  const notifyNotActiveSeller = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="Seller is not active!" />
    ));
  /**<Input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeller(e.target.value)}
                value={seller}
              />
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                value={customer}
              /> */
  return (
    <MainContainer>
      <Container>
        <HeaderContainer>
          <Header>Edit an {props.type}</Header>
          <IconConatiner onClick={discardForm}>
            <Icon icon="delete" />
          </IconConatiner>
        </HeaderContainer>
        <OptionsContainer>
          <OptionsContainer>
            <Option>
              <Label>Seller</Label>
              <Select value={seller} onChange={(e) => setSeller(e.target.value)}>
                {sellersStore.sellers.map((seller, key) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  return <option key={key}>{(seller as any).companyName}</option>;
                })}
              </Select>
            </Option>
            <Option>
              <Label>Customer</Label>
              <Select value={customer} onChange={(e) => setCustomer(e.target.value)}>
                {customersStore.customers.map((customer, key) => {
                  return (
                    <option key={key}>
                      {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (customer as any).name + ` ` + (customer as any).surname
                      }
                    </option>
                  );
                })}
              </Select>
            </Option>
            <Option>
              <Label>Date</Label>
              <InputDate
                onChange={onChange}
                allowClear={false}
                value={moment(date, 'DD.MM.YYYY')}
                format="DD.MM.YYYY"
                disabledDate={(current) => {
                  return current && moment(current) > moment(); //no future dates
                }}
              />
            </Option>
            <Option>
              <Label>Amount</Label>
              <Input
                required
                min={1}
                type="number"
                onChange={(e) => setAmount(parseInt(e.target.value))}
                value={amount}
              />
            </Option>
          </OptionsContainer>
        </OptionsContainer>
        <ButtonsContainer>
          <ModalButton text="Discard" color="188, 193, 22" onClick={discardForm} />
          <ModalButton text="Save" color="103, 178, 71" onClick={saveForm} />
        </ButtonsContainer>
      </Container>
      <Toaster position="top-right" reverseOrder={false} />
    </MainContainer>
  );
};

export default observer(Modal);

//MainContainer is used for backdrop
const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: auto;
  right: 0;
  top: 0;
  z-index: 1000;
  border: 2px solid black;
  width: 252px;
  border-radius: 30px;
  height: 355px;
  background: white;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Header = styled.span`
  font-weight: bold;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5px 5px;
`;

const Label = styled.label`
  font-weight: 700;
`;
const Input = styled.input`
  margin-top: 3px;
  border: 2px solid gray;
  border-radius: 5px;
`;

const Select = styled.select`
  margin-top: 3px;
  border: 2px solid gray;
  border-radius: 5px;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 15px 5px;
`;

const IconConatiner = styled.div`
  height: 15px;
  margin-right: 10px;
  position: absolute;
  right: 10px;
  &:hover {
    color: red;
  }
`;

const ModalButton = styled(Button)``;

const InputDate = styled(DatePicker)`
  width: 100%;
  &:hover {
    border: 1px solid black;
  }
`;
