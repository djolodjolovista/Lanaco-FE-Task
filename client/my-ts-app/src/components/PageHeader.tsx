import React from 'react';
import styled from 'styled-components';

interface PageHeaderProps {
  text: string;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Container>
      <Text>{props.text}</Text>
    </Container>
  );
};

export default PageHeader;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  width: 20%;
  border-radius: 10px;
  margin-top: 30px;
  background: black;
`;

const Text = styled.h1`
  font-size: 20px;
  color: white;
  font-family: Serif;
`;
