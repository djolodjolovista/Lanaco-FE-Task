import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <Container>
      <HashLoader color="blue" loading={true} size={80} />
    </Container>
  );
};

export default Spinner;

const Container = styled.div`
  margin-top: 80px;
`;
