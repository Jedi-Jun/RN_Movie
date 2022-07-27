import React, { useState, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { BigMovieData } from '../../../../lib/staticData';

const Container = styled.View``;

const MovieFlatList = styled.FlatList`
  max-height: 380px;
`;

const Poster = styled.Pressable<{ windowWidth: number }>`
  width: ${({ windowWidth }) => windowWidth}px;
  height: 300px;
`;

const CountText = styled.Text`
  position: absolute;
  right: 20px;
  color: white;
`;

const Image = styled.Image`
  width: 100%;
  height: 80%;
`;

const Footer = styled.View`
  width: 100%;
  height: 20%;
  justify-content: center;
  padding: 0 8px;
`;

const FooterTitle = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: bold;
  text-transform: capitalize;
`;

const FooterGenres = styled.Text`
  color: white;
  font-size: 15px;
  text-transform: capitalize;
`;

const DotView = styled.View`
  height: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.Pressable<{ dotIndex: number; currentIndex: number }>`
  width: 10px;
  height: 10px;
  border: 1px solid #474747;
  background-color: ${({ dotIndex, currentIndex }) =>
    dotIndex === currentIndex ? '#fff' : '#363636'};
  border-radius: 50px;
  margin-right: 10px;
`;

interface carouselItems {
  id: number;
  imdb_code: string;
  title: string;
  year: string;
  genres: string[];
  url: string;
}

interface IProps {
  navigation: any;
}

export default function BigCatalogList({ navigation }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  let flatListRef = useRef<FlatList<carouselItems> | any>(null);

  // Dot view
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };
  const onViewRef = useRef(({ changed }: any) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const changed = [
    {
      index: 1,
      isViewable: true,
      item: {
        genres: [Array],
        id: 2,
        imdb_code: 'tt1825683',
        title: 'black panther',
        url: 'https://img.yts.mx/assets/images/movies/black_panther_2018/large-cover.jpg',
        year: '2018',
      },
      key: '1-black panther',
    },
  ];

  const scrollToIndex = (index: number) => {
    flatListRef.current.scrollToIndex({ animated: true, index: index });
  };

  const renderItem: React.FC<{ item: carouselItems | any; index: number }> = ({
    item,
    index,
  }) => {
    const windowWidth = Dimensions.get('window').width;
    const genres = item.genres.join(', ');
    return (
      <Poster
        windowWidth={windowWidth}
        onPress={() =>
          navigation.navigate('Detail', {
            imdb_code: item.imdb_code,
          })
        }>
        <Image style={{ resizeMode: 'cover' }} source={{ uri: item.url }} />
        <CountText>
          {index + 1} / {BigMovieData.length}
        </CountText>
        <Footer>
          <FooterTitle>
            {item.title} ({item.year})
          </FooterTitle>
          <FooterGenres>{genres}</FooterGenres>
        </Footer>
      </Poster>
    );
  };

  return (
    <Container>
      <MovieFlatList
        keyExtractor={(item: any, index: number) => `${index}-${item.title}`}
        data={BigMovieData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={ref => (flatListRef.current = ref)}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
      />
      <DotView>
        {BigMovieData.map((_, index: number) => (
          <Dot
            key={index}
            dotIndex={index}
            currentIndex={currentIndex}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </DotView>
    </Container>
  );
}
