import React from 'react';
import styled from 'styled-components';
import parentStore from '../../stores/parent';
import Button from '../Button';
import Spinner from '../Spinner';

interface DeleteModalProps {
  yes: () => void;
  no: () => void;
  label: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <MainContainer>
      <Container>
        {parentStore.loading ? (
          <DeleteSpinner cssOveride={{ display: 'inline', position: 'initial' }} size={40} />
        ) : (
          <>
            <Label>{props.label}</Label>
            <ButtonContainer>
              <Button color="255, 77, 77" text="Yes" onClick={props.yes} />
              <Button color="179, 179, 179" text="No" onClick={props.no} />
            </ButtonContainer>
          </>
        )}
      </Container>
    </MainContainer>
  );
};

export default DeleteModal;

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
  height: 110px;
  bottom: 0;
  left: 0;
  margin: auto;
  right: 0;
  top: 0;
  z-index: 1001;
  background: white;
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

const DeleteSpinner = styled(Spinner)`
  display: inline !important;
  position: initial !important;
`;
