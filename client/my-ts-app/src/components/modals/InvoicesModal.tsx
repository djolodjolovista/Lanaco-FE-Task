import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Button from '../Button';
import invoicesStore from '../../stores/invoices';
import { observer } from 'mobx-react';
import moment from 'moment';
import { api } from '../../api/ApiRequests';
import { Invoice } from '../../stores/invoices';
import parentStore from '../../stores/parent';
import DatePicker from '../DatePicker';
import sellersStore, { Seller } from '../../stores/sellers';
import customersStore, { Customer } from '../../stores/customers';
import { toast, Toaster } from 'react-hot-toast';
import Notification from '../Notification';
import Spinner from '../Spinner';
moment.suppressDeprecationWarnings = true;

interface ModalProps {
  headerText: string;
}

const Modal = (props: ModalProps) => {
  const [seller, setSeller] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [sellerId, setSellerId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const onChange = (date: any, dateString: any) => {
    setDate(dateString);
  };
  const fetchData = async () => {
    let data: Invoice = {
      id: '',
      sellerName: '',
      customerName: '',
      date: moment().format('DD.MM.YYYY'),
      amount: 0,
      sellerId: '',
      customerId: ''
    };
    if (id) {
      try {
        data = (await api.getInvoice(id))?.data;
      } catch (error) {
        console.log(error);
        navigate('/invoices');
      }
      setSeller(data.sellerName);
      setCustomer(data.customerName);
      setDate(moment(data.date, 'DD.MM.YYYY').format('DD.MM.YYYY'));
      setAmount(data.amount);
    } else {
      setSeller('');
      setCustomer('');
      setDate(moment().format('DD.MM.YYYY'));
      setAmount(0);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const saveForm = () => {
    const body = {
      sellerName: seller,
      customerName: customer,
      date: date,
      amount: amount,
      sellerId: sellerId,
      customerId: customerId
    };
    if (!sellersStore.checkSellerIsActive(seller)) {
      notifyNotActiveSeller();
    } else if (body.amount === 0) {
      notifyAmount();
    } else if (body.customerName === '') {
      notifyCustomer();
    } else if (id) {
      //edit
      invoicesStore.updateInvoice(id, body);
      navigate('/invoices');
    } else {
      //create
      invoicesStore.createInvoice(body);
    }
  };
  const discardForm = () => {
    if (id) {
      parentStore.resetSelectedRows();
      navigate('/invoices');
    } else {
      parentStore.resetSelectedRows();
      invoicesStore.toggleModal();
    }
  };

  const notifyNotActiveSeller = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="Seller is not active!" />
    ));
  const notifyAmount = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="Amount must be greater than 0 !" />
    ));
  const notifyCustomer = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="Customer is not selected!" />
    ));

  return (
    <MainContainer>
      <Container>
        <HeaderContainer>
          <Header>{props.headerText}</Header>
          <IconConatiner onClick={discardForm}>
            <Icon icon="delete" />
          </IconConatiner>
        </HeaderContainer>
        <OptionsContainer>
          <OptionsContainer>
            <Option>
              <Label>Seller</Label>
              <Select
                value={seller}
                onChange={(e) => {
                  setSeller(e.target.value);
                  setSellerId((sellersStore.findSeller(e.target.value)! as Seller).id);
                }}>
                <option value="">Choose seller</option>
                {sellersStore.sellers.map((seller: Seller, key) => {
                  return (
                    <option value={seller.companyName} key={key}>
                      {seller.companyName}
                    </option>
                  );
                })}
              </Select>
            </Option>
            <Option>
              <Label>Customer</Label>
              <Select
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                  setCustomerId((customersStore.findCustomer(e.target.value)! as Customer).id);
                }}>
                <option value="">Choose customer</option>
                {customersStore.customers.map((customer: Customer, key) => {
                  return (
                    <option key={key} value={customer.name + ` ` + customer.surname}>
                      {customer.name + ` ` + customer.surname}
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
                showToday={false}
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
                step="0.5"
                onChange={(e) =>
                  !isNaN(parseInt(e.target.value)) && setAmount(parseFloat(e.target.value))
                }
                value={amount}
              />
            </Option>
          </OptionsContainer>
        </OptionsContainer>
        <ButtonsContainer>
          {parentStore.loading ? (
            <Spinner cssOveride={{ display: 'inline', position: 'initial' }} size={40} />
          ) : (
            <>
              <ModalButton text="Discard" color="188, 193, 22" onClick={discardForm} />
              <ModalButton text="Save" color="103, 178, 71" onClick={saveForm} />
            </>
          )}
        </ButtonsContainer>
      </Container>
      <Toaster position="top-right" reverseOrder={false} />
    </MainContainer>
  );
};

export default observer(Modal);

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
