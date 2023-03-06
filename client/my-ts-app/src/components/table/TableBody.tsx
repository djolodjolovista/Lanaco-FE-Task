import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import invoicesStore from '../../stores/invoices';

interface TableBodyProps {
  elements: any[];
  type: string;
}

interface TableBodyInvoices {
  sellerName: string;
  customerName: string;
  date: Date;
  amount: string;
  id: string;
  sellerId: string;
  customerId: string;
}

interface TableBodySellers {
  companyName: string;
  hqAdress: string;
  isActive: boolean;
}

interface TableBodyCustomers {
  name: string;
  surname: string;
  adress: string;
  age: number;
}

const TableBody = (props: TableBodyProps) => {
  const navigate = useNavigate();
  if (props.type === 'INVOICES' && (props.elements as unknown as TableBodyInvoices)) {
    return (
      <TableContainer>
        <Table>
          <tbody>
            {props.elements.map(
              (
                item: {
                  id: string;
                  sellerName: string;
                  customerName: string;
                  date: Date;
                  amount: string;
                },
                key
              ) => {
                return (
                  <TableRow
                    key={key}
                    onClick={() => {
                      navigate(`/invoices/${item.id}`);
                    }}>
                    <TableCell>{item.sellerName}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{moment(item.date).format('MM/DD/YYYY')}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                );
              }
            )}
          </tbody>
        </Table>
      </TableContainer>
    );
  } else if (props.type === 'SELLERS' && (props.elements as unknown as TableBodySellers)) {
    return (
      <TableContainer>
        <Table>
          <tbody>
            {props.elements.map(
              (item: { companyName: string; hqAdress: string; isActive: boolean }, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.companyName}</TableCell>
                    <TableCell>{item.hqAdress}</TableCell>
                    <TableCell>{item.isActive ? 'YES' : 'NO'}</TableCell>
                  </TableRow>
                );
              }
            )}
          </tbody>
        </Table>
      </TableContainer>
    );
  } else if (props.type === 'CUSTOMERS' && (props.elements as unknown as TableBodyCustomers)) {
    return (
      <TableContainer>
        <Table>
          <tbody>
            {props.elements.map(
              (item: { name: string; surname: string; adress: string; age: number }, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.surname}</TableCell>
                    <TableCell>{item.adress}</TableCell>
                    <TableCell>{item.age}</TableCell>
                  </TableRow>
                );
              }
            )}
          </tbody>
        </Table>
      </TableContainer>
    );
  } else {
    return null;
  }
};

export default TableBody;

const TableContainer = styled.div`
  margin-top: 10px;
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 5px;
`;

const TableCell = styled.td`
  border: 1px solid black;
  border-style: solid none;
  padding: 5px;
  width: 120px;
  &:first-child {
    border-left-style: solid;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-right-style: solid;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background: #8080801a;
    cursor: pointer;
  }
`;
