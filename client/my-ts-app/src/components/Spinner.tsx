import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styled from 'styled-components';

interface SpinnerProps {
  size?: number;
  cssOveride?: React.CSSProperties;
}

const Spinner = ({ size = 80, cssOveride = {} }: SpinnerProps) => {
  return (
    <Container>
      <HashLoader cssOverride={cssOveride} color="blue" loading={true} size={size} />
    </Container>
  );
};

export default Spinner;

const Container = styled.div`
  margin-top: 80px;
`;
