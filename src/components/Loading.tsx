import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator``;

function Loading() {
  return (
    <Container>
      <Spinner size={60} color="#fad179" />
    </Container>
  );
}

export default Loading;
