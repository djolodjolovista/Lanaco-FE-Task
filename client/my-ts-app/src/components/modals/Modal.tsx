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

interface ModalProps {
  type: string;
  //options: { text: string; onClick: (e: React.ChangeEvent) => void }[];
  options: { text: string }[];
}

const Modal = (props: ModalProps) => {
  const [seller, setSeller] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('ID->>>>', id);
  const fetchData = async () => {
    let data: Invoice = {
      sellerName: '',
      customerName: '',
      date: new Date(),
      amount: 0,
      sellerId: '',
      customerId: ''
    };
    data = id && (await api.getInvoice(id)).data;
    setSeller(data.sellerName);
    setCustomer(data.customerName);
    setDate(data.date);
    setAmount(data.amount);
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
    id && api.updateInvoice(id, body);
    await delay(600); //update 'put' method need more time for execution, after that we refresh data
    invoicesStore.fetchInvoices();
    navigate('/invoices');
  };
  const deleteForm = () => {
    null;
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <MainContainer>
      <Container>
        <HeaderContainer>
          <Header>Edit an {props.type}</Header>
          <IconConatiner onClick={() => navigate('/invoices')}>
            <Icon icon="delete" />
          </IconConatiner>
        </HeaderContainer>
        <OptionsContainer>
          <OptionsContainer>
            <Option>
              <Label>Seller</Label>
              <Input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeller(e.target.value)}
                value={seller}
              />
            </Option>
            <Option>
              <Label>Customer</Label>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                value={customer}
              />
            </Option>
            <Option>
              <Label>Date</Label>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(new Date(e.target.value))
                }
                value={moment(date).format('DD.MM.YYYY')}
              />
            </Option>
            <Option>
              <Label>Amount</Label>
              <Input onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} />
            </Option>
          </OptionsContainer>
        </OptionsContainer>
        <ButtonsContainer>
          <ModalButton text="Discard" color="188, 193, 22" onClick={deleteForm} />
          <ModalButton text="Save" color="103, 178, 71" onClick={saveForm} />
        </ButtonsContainer>
      </Container>
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
