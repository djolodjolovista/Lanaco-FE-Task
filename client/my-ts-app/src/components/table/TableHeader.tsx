import React from 'react';
import styled from 'styled-components';

interface TableHeaderProps {
  cellsContent: string[];
}

const TableHeader = (props: TableHeaderProps) => {
  return (
    <Container>
      {props.cellsContent.map((item, key) => {
        return <Cell key={key}>{item}</Cell>;
      })}
    </Container>
  );
};

export default TableHeader;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 250px;
  background: #8080803b;
`;

const Cell = styled.span`
  font-weight: bold;
  width: 117px;
  padding: 5px;
  &:first-child {
    margin-left: 5px;
  }
  &:last-child {
    margin-right: 5px;
  }
`;
