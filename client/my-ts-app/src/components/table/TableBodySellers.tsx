import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import parentStore from '../../stores/parent';
import Pagination from '../../components/Pagination';
import sellersStore from '../../stores/sellers';

interface TableBodyProps {
  elements: any[];
  type: string;
  row: string;
}

interface TableBodySellers {
  companyName: string;
  hqAdress: string;
  isActive: boolean;
}

const TableBodySellers = (props: TableBodyProps) => {
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(4);
  useEffect(() => {
    setElements(sellersStore.sellers);
  }, []);
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <Table>
        <tbody>
          {currentElements.map(
            (
              item: { id: string; companyName: string; hqAdress: string; isActive: boolean },
              key
            ) => {
              return (
                <TableRow
                  selected={props.row === item.id}
                  id={item.id}
                  onClick={() => parentStore.addSelectedRow(item.id)}
                  key={key}>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.hqAdress}</TableCell>
                  <TableCell>{item.isActive ? 'YES' : 'NO'}</TableCell>
                </TableRow>
              );
            }
          )}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalElements={elements.length}
        paginate={paginate}
      />
    </TableContainer>
  );
};

export default observer(TableBodySellers);

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
  ${(props) => props.selected && `background: #8080801a;`}
  &:hover {
    background: #8080801a;
    cursor: pointer;
  }
`;
