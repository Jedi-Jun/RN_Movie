import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Loading from '~/components/Loading';
import { movieAPI } from '../../../../lib/api/movie';

const Container = styled.View`
  padding-left: 10px;
`;

const SectionTitle = styled.Text`
  color: white;
  text-transform: capitalize;
  font-size: 18px;
  margin-left: 2px;
  margin-bottom: 12px;
`;

const MovieList = styled.FlatList``;

const Poster = styled.Pressable`
  margin-right: 10px;
  width: 110px;
  height: 150px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 18px;
`;

const CountText = styled.Text`
  position: absolute;
  right: 20px;
  color: white;
`;

interface IProps {
  navigation: any;
  sectionTitle: 'newest' | 'rating' | 'downloaded';
  query: string;
  resize: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export default function SubCatalogList({
  navigation,
  sectionTitle,
  query,
  resize,
}: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movieList, setMovieList] = useState<MovieType[]>([]);

  const getMovies = async () => {
    setIsLoading(true);
    const movies = await movieAPI(query).then(res => res.data.data.movies);
    setMovieList([]); // initialize array
    movies.forEach((movie: MovieType) => {
      setMovieList((prevState: MovieType[]) => [
        ...prevState,
        {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          rating: movie.rating,
          medium_cover_image: movie.medium_cover_image,
          large_cover_image: movie.large_cover_image,
          imdb_code: movie.imdb_code,
        },
      ]);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  // https://reactnavigation.org/docs/elements/#header
  /* useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="MOVIE APP" icon="logout" />,
    });
    getMovie();
  }, []); */

  type RenderItemType = {
    item: MovieType | any;
    index: number;
  };

  const renderItem: React.FC<RenderItemType> = ({ item, index }) => {
    return (
      <Poster
        onPress={() =>
          navigation.navigate('Detail', {
            imdb_code: item.imdb_code,
          })
        }>
        <Image
          style={{ resizeMode: resize }}
          source={{ uri: item.large_cover_image }}
        />
        <CountText>
          {index + 1} / {movieList.length}
        </CountText>
      </Poster>
    );
  };

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SectionTitle>{sectionTitle}</SectionTitle>
          <MovieList
            horizontal={true}
            keyExtractor={(item: any, index: number) =>
              `${index}-${item.title}`
            }
            data={movieList}
            renderItem={renderItem}
          />
        </>
      )}
    </Container>
  );
}
