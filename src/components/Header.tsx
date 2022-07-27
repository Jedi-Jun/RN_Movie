import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { MovieContext } from '../components/movieContext';

const Container = styled.View`
  background-color: #242424;
  height: 50px;
`;

const TitleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const IconLogout = styled.Pressable`
  position: absolute;
  top: 25%;
  right: 10px;
`;

const Image = styled.Image`
  width: 25px;
  height: 25px;
`;

interface IProps {
  title: string;
  icon?: 'login' | 'logout' | 'menu';
}

function Header({ title, icon }: IProps) {
  const { logout } = useContext(MovieContext);

  const icons = {
    login: {
      id: 1,
      uri: require('@assets/images/ic_login.png'),
    },
    logout: {
      id: 2,
      uri: require('@assets/images/ic_logout.png'),
    },
    menu: {
      id: 3,
      uri: require('@assets/images/ic_menu.png'),
    },
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{title}</Title>
        {icon && (
          <IconLogout onPress={() => logout()}>
            <Image source={icons[icon].uri} />
          </IconLogout>
        )}
      </TitleWrapper>
    </Container>
  );
}

export default Header;
