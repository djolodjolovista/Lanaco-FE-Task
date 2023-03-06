import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

interface InvoicesFormModalProps {
  data: any;
}

const InvoiceFormModal = (props: InvoicesFormModalProps) => {
  return (
    <OptionsContainer>
      <Option>
        <Label>Seller</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
          value={props.data.seller}
        />
      </Option>
      <Option>
        <Label>Customer</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
          value={props.data.customer}
        />
      </Option>
      <Option>
        <Label>Date</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
          value={props.data.date}
        />
      </Option>
      <Option>
        <Label>Amount</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => null}
          value={props.data.amount}
        />
      </Option>
    </OptionsContainer>
  );
};

export default observer(InvoiceFormModal);

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
