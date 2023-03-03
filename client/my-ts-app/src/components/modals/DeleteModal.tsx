import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface DeleteModalProps {
  yes: () => void;
  no: () => void;
  label: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <ButtonContainer>
        <Button color="255, 77, 77" text="Yes" onClick={props.yes} />
        <Button color="179, 179, 179" text="No" onClick={props.no} />
      </ButtonContainer>
    </Container>
  );
};

export default DeleteModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 115px;
  border: 2px solid black;
  width: 250px;
  border-radius: 20px;
`;

const Label = styled.span`
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100%;
`;
