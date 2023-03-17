import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Button from '../Button';
import { observer } from 'mobx-react';
import moment from 'moment';
import { api } from '../../api/ApiRequests';
import parentStore from '../../stores/parent';
import sellersStore, { Seller } from '../../stores/sellers';
import { toast, Toaster } from 'react-hot-toast';
import Notification from '../Notification';
import Spinner from '../Spinner';
moment.suppressDeprecationWarnings = true;

interface ModalProps {
  headerText: string;
}

const Modal = (props: ModalProps) => {
  const [companyName, setCompanyName] = useState('');
  const [adress, setAdress] = useState('');
  const [isActive, setIsActive] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    let data: Seller = {
      companyName: '',
      hqAdress: '',
      isActive: false,
      id: ''
    };
    if (id) {
      try {
        data = (await api.getSeller(id))?.data;
      } catch (error) {
        console.log(error);
        navigate('/sellers');
      }
      setCompanyName(data.companyName);
      setAdress(data.hqAdress);
      setIsActive(data.isActive);
    } else {
      setCompanyName('');
      setAdress('');
      setIsActive(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const saveForm = () => {
    const body = {
      companyName: companyName,
      hqAdress: adress,
      isActive: isActive
    };
    if (body.companyName === '' || body.hqAdress === '') {
      notify();
    } else if (id) {
      sellersStore.updateSeller(id, body);
      navigate('/sellers');
    } else {
      sellersStore.createSeller(body);
    }
  };
  const discardForm = () => {
    if (id) {
      parentStore.resetSelectedRows();
      navigate('/sellers');
    } else {
      parentStore.resetSelectedRows();
      sellersStore.toggleModal();
    }
  };

  const notify = () =>
    toast.custom((t) => (
      <Notification onClick={() => toast.dismiss(t.id)} text="All fields are required!" />
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
              <Label>Company name</Label>
              <Input
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
            </Option>
            <Option>
              <Label>Adress</Label>
              <Input type="text" onChange={(e) => setAdress(e.target.value)} value={adress} />
            </Option>
            <Option>
              <Label>Active</Label>
              <RadioButtonsContainer>
                <RadioButtonContainer>
                  <label htmlFor="yes">Yes</label>
                  <Input
                    type="radio"
                    name="active"
                    value="YES"
                    key="yes"
                    checked={isActive}
                    onChange={() => setIsActive(true)}
                  />
                </RadioButtonContainer>
                <RadioButtonContainer>
                  <label htmlFor="no">No</label>
                  <Input
                    type="radio"
                    name="active"
                    value="NO"
                    key="no"
                    checked={!isActive}
                    onChange={() => setIsActive(false)}
                  />
                </RadioButtonContainer>
              </RadioButtonsContainer>
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

const RadioButtonsContainer = styled.div`
  flex-direction: column;
  margin-top: 10px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: 20px;
  margin-bottom: 5px;
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
