import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const AppPagination = ({ elementsPerPage, totalElements, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }
  /** onClick={() => {
            paginate(number);
            setClicked(true);
          }}*/
  /**{pageNumbers.map((number) => (
        <Number key={number} clicked={currentPage === number} href="#">
          {number}
        </Number>
      ))} */

  return (
    <MainContainer>
      <ChangePage
        onClick={() => {
          currentPage > 1 && paginate(currentPage - 1);
          //setClicked(true);
        }}>
        {'<'}
      </ChangePage>
      <CurrentPage>{currentPage}</CurrentPage>
      <ChangePage
        onClick={() => {
          currentPage < pageNumbers.length && paginate(currentPage + 1);
          //setClicked(true);
        }}>
        {'>'}
      </ChangePage>
      <TotalPages>{pageNumbers.length}</TotalPages>
    </MainContainer>
  );
};

export default AppPagination;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const TotalPages = styled.span`
  margin-left: 10px;
  text-decoration: none;
  ${(props) => (props.clicked ? `color: blue;` : `color: black;`)}
  border: 1.2px solid black;
  border-radius: 5px;
  padding: 1px 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const CurrentPage = styled(TotalPages)`
  margin: 0px;
`;

const ChangePage = styled(TotalPages)`
  margin-left: 3px;
  margin-right: 3px;
  &:hover {
    color: blue;
    font-weight: bold;
    border: 1.2px solid blue;
  }
`;
