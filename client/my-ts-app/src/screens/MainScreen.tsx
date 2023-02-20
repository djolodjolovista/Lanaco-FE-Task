import React from 'react';
import styled from 'styled-components';

const MainScreen = () => {
  return (
    <Container>
      <Title>Calculator</Title>
      <CalculatorContainer>test</CalculatorContainer>
      <Footer>Footer</Footer>
    </Container>
  );
};

export default MainScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CalculatorContainer = styled.div``;

const Title = styled.h1`
  color: red;
`;

const Footer = styled.div``;
