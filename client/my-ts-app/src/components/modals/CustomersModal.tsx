import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Button from '../Button';
import { observer } from 'mobx-react';
import { api } from '../../api/ApiRequests';
import parentStore from '../../stores/parent';
import customersStore, { Customer } from '../../stores/customers';
import { toast, Toaster } from 'react-hot-toast';
import Notification from '../Notification';
import Spinner from '../Spinner';

interface ModalProps {
  headerText: string;
}

const Modal = (props: ModalProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [adress, setAdress] = useState('');
  const [age, setAge] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    let data: Customer = {
      name: '',
      surname: '',
      adress: '',
      age: 0,
      id: ''
    };
    if (id) {
      try {
        data = (await api.getCustomer(id))?.data;
      } catch (error) {
        console.log(error);
        navigate('/customers');
      }
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
    fetchData();
  }, []);

  const saveForm = async () => {
    const body = {
      name: name,
      surname: surname,
      adress: adress,
      age: age
    };
    if (body.name === '' || body.surname === '' || body.adress === '' || body.age === 0) {
      notify();
    } else if (id) {
      customersStore.updateCustomer(id, body);
      navigate('/customers');
    } else {
      customersStore.createCustomer(body);
    }
  };
  const discardForm = () => {
    if (id) {
      parentStore.resetSelectedRows();
      navigate('/customers');
    } else {
      parentStore.resetSelectedRows();
      customersStore.toggleModal();
    }
  };

  const notify = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="All fileds are required! (Age > 0)" />
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
                onChange={(e) =>
                  !isNaN(parseInt(e.target.value)) && setAge(parseInt(e.target.value))
                }
                value={age}
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
