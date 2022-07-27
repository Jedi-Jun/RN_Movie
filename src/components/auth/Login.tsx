import React, { useState, useEffect, useContext } from 'react';
import { Linking } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { MovieContext } from '../movieContext';
import Header from '../Header';
import Input from '../common/Input';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.Text`
  color: #f07777ef;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: -70px;
  margin-bottom: 70px;
`;

const MainContainer = styled.View`
  width: 100%;
`;

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.View``;

const ButtonText = styled.Text`
  color: white;
`;

const LoginBtn = styled.Pressable`
  border: 1px solid gray;
  height: 42px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
`;

const SetPasswordBtnWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const SetPasswordBtn = styled.Pressable``;

type NavigationProp = NativeStackNavigationProp<LoginNaviParamList, 'Login'>;

interface IProps {
  navigation: NavigationProp;
}

export default function Login({ navigation }: IProps) {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setIsLogged, storeLoginData } =
    useContext<IMovieContext>(MovieContext);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Login" />,
    });
  }, []);

  const verifyLogin = () => {
    if (userId === '') {
      return Alert.alert('Insert your ID.');
    }
    if (password === '') {
      return Alert.alert('Insert your password.');
    }
    if (userId === 'foo' && password === '1234') {
      storeLoginData({ id: userId, status: 'ok' });
      setIsLogged(true);
    } else {
      return Alert.alert("You've got the wrong ID or password maybe..");
    }
  };

  return (
    <Container>
      <Title>NETFLIX</Title>
      <MainContainer>
        <InputWrapper>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => setUserId(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </InputWrapper>
        <ButtonWrapper>
          <LoginBtn
            onPress={() => verifyLogin()}
            // onLongPress={() => setIsLogged(true)}
            style={({ pressed }) => [
              {
                backgroundColor: '#222',
                opacity: pressed ? 0.4 : 1,
              },
            ]}>
            <ButtonText>Login</ButtonText>
          </LoginBtn>
          <SetPasswordBtnWrapper>
            <SetPasswordBtn
              onPress={() => Linking.openURL('https://www.google.com')}>
              <ButtonText>Reset Password</ButtonText>
            </SetPasswordBtn>
          </SetPasswordBtnWrapper>
        </ButtonWrapper>
      </MainContainer>
    </Container>
  );
}
