import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Button from '../Button';
import { observer } from 'mobx-react';
import { api } from '../../api/ApiRequests';

import parentStore from '../../stores/parent';

//import { DatePicker, Space } from 'antd';
import DatePicker from '../DatePicker';

import customersStore, { Customer } from '../../stores/customers';
import { toast, Toaster } from 'react-hot-toast';
import Notification from '../Notification';

interface ModalProps {
  type: string;
  //options: { text: string; onClick: (e: React.ChangeEvent) => void }[];
  options?: { text: string }[];
}

const Modal = (props: ModalProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [adress, setAdress] = useState('');
  const [age, setAge] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('ID->>>>', id);

  const fetchData = async () => {
    let data: Customer = {
      name: '',
      surname: '',
      adress: '',
      age: 0
    };
    if (id) {
      data = (await api.getCustomer(id)).data;
      setName(data.name);
      setSurname(data.surname);
      setAdress(data.adress);
      setAge(data.age);
    } else {
      setName('');
      setSurname('');
      setAdress('');
      setAge(0);
    }
  };
  useEffect(() => {
    //id && invoicesStore.getInvoice(id);
    fetchData();
  }, []);

  //if (props.type === 'INVOICE') {
  //setData(invoicesStore.invoice);
  // }
  const saveForm = async () => {
    const body = {
      name: name,
      surname: surname,
      adress: adress,
      age: age
    };
    if (id) {
      if (!Number.isNaN(body.age) && body.age !== 0) {
        api.updateCustomer(id, body);
        await delay(600); //update 'put' method need more time for execution, after that we refresh data
        customersStore.fetchCustomers();
        parentStore.addSelectedRow('');
        navigate('/customers');
      } else {
        notify();
      }
    } else {
      api.createCustomer(body);
      await delay(400); //create 'post' method need more time for execution, after that we refresh data
      customersStore.fetchCustomers();
      parentStore.addSelectedRow('');
      customersStore.toggleModal();
    }
  };
  const discardForm = () => {
    if (id) {
      navigate('/customers');
    } else {
      customersStore.toggleModal();
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const notify = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="Age can't be 0 or empty!" />
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
              <Label>Name</Label>
              <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            </Option>
            <Option>
              <Label>Surname</Label>
              <Input type="text" onChange={(e) => setSurname(e.target.value)} value={surname} />
            </Option>
            <Option>
              <Label>Adress</Label>
              <Input type="text" onChange={(e) => setAdress(e.target.value)} value={adress} />
            </Option>
            <Option>
              <Label>Age</Label>
              <Input
                required
                min={1}
                type="number"
                onChange={(e) => setAge(parseInt(e.target.value))}
                value={age}
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
