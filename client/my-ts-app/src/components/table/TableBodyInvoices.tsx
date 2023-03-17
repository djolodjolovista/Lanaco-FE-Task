import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Invoice } from '../../stores/invoices';
import parentStore from '../../stores/parent';
import Pagination from '../../components/Pagination';

interface TableBodyProps {
  elements: Invoice[];
  row: string[];
}

const TableBodyInvoices = (props: TableBodyProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(4);

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = props.elements.slice(indexOfFirstElement, indexOfLastElement);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <Table>
        <tbody>
          {currentElements.map((item, key) => {
            return (
              <TableRow
                selected={props.row.some((row) => row === item.id)}
                id={item.id}
                key={key}
                onClick={() => {
                  parentStore.addSelectedRow(item.id);
                }}>
                <TableCell>
                  <RowLink to={`/sellers/${item.sellerId}`}>{item.sellerName}</RowLink>
                </TableCell>
                <TableCell>
                  <RowLink to={`/customers/${item.customerId}`}>{item.customerName}</RowLink>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.amount}$</TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalElements={props.elements.length}
        paginate={paginate}
      />
    </TableContainer>
  );
};

export default observer(TableBodyInvoices);

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

const TableRow = styled.tr<{ selected: boolean }>`
  ${(props) => props.selected && `background: #2199f347;`}
  &:hover {
    background: #2199f347;
    cursor: pointer;
  }
`;

const RowLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;
