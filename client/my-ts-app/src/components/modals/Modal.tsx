import React from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Button from '../Button';

interface ModalProps {
  title: string;
  //options: { text: string; onClick: (e: React.ChangeEvent) => void }[];
  options: { text: string }[];
}

const Modal = (props: ModalProps) => {
  const saveForm = () => {
    null;
  };
  const deleteForm = () => {
    null;
  };
  return (
    <Container>
      <HeaderContainer>
        <Header>{props.title}</Header>
        <IconConatiner>
          <Icon icon="delete" />
        </IconConatiner>
      </HeaderContainer>
      <OptionsContainer>
        {props.options.map((item, key) => {
          return (
            <Option key={key}>
              <Label>{item.text}</Label>
              <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => null} />
            </Option>
          );
        })}
      </OptionsContainer>
      <ButtonsContainer>
        <ModalButton text="Discard" color="188, 193, 22" onClick={saveForm} />
        <ModalButton text="Create" color="103, 178, 71" onClick={deleteForm} />
      </ButtonsContainer>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 115px;
  border: 2px solid black;
  width: 25%;
  border-radius: 30px;
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
