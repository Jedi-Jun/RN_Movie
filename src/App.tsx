import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigator from './components/Navigator';
import { MovieContextProvider } from './components/movieContext';

const Container = styled.View`
  flex: 1;
  background-color: #141414;
`;

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <MovieContextProvider>
        <Navigator />
      </MovieContextProvider>
    </Container>
  );
}

export default App;
