import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import SubCatalogList from './catalog/SubCatalogList';
import BigCatalogList from './catalog/BigCatalogList';
import { subMovieData } from '../../../lib/staticData';

const Container = styled.SafeAreaView``;

const SubCatalogFlatList = styled.FlatList``;

const SubCatalogListWrapper = styled.View`
  margin: 10px 0;
`;

type NavigationProp = NativeStackNavigationProp<HomeNaviParamList, 'Home'>;

interface IProps {
  navigation: NavigationProp;
}

const MovieRoot: React.FC<IProps> = ({ navigation }) => {
  return (
    <Container>
      <SubCatalogFlatList
        keyExtractor={(item: any) => item.id}
        data={subMovieData}
        renderItem={({ item }: any) => (
          <>
            {item.id === 1 && <BigCatalogList navigation={navigation} />}
            <SubCatalogListWrapper>
              <SubCatalogList
                navigation={navigation}
                sectionTitle={item.sectionTitle}
                query={item.query}
                resize="center"
              />
            </SubCatalogListWrapper>
          </>
        )}
      />
    </Container>
  );
};

export default MovieRoot;
