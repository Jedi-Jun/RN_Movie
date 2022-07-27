import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './auth/Login';
import MovieHome from './contents/MovieHome';
import MovieDetail from './contents/detail/MovieDetail';
import Header from './Header';
import { MovieContext } from '../components/movieContext';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();

const _DefaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '',
          headerTransparent: true,
          // headerTintColor: 'white',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }}
        // options={{ header: () => <Header title="Login" /> }}
      />
    </Stack.Navigator>
  );
};

const MovieNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MovieHome}
        /* options={{
          title: '',
          headerShown: false,
          headerTransparent: false,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} */
        options={{
          header: () => <Header title="MOVIE APP" icon="logout" />,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={MovieDetail}
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function Navigator() {
  const { isLogged, isLoading } = useContext(MovieContext);

  return isLoading ? (
    <Loading />
  ) : (
    <NavigationContainer theme={MyTheme}>
      {isLogged ? <MovieNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}
