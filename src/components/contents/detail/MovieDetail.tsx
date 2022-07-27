import React, { useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { movieDetailAPI } from '../../../../lib/api/movie';

const Container = styled.SafeAreaView``;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.View`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 620px;
`;

const Article = styled.View`
  padding: 25px 17px;
`;

const Backgorund = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: '#f80000';
  /* background-color: #141414; */
  opacity: 0.9;
`;

const MovieTitle = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Description = styled.View`
  flex-direction: row;
  padding: 0 2px;
`;

const Text = styled.Text`
  color: white;
  font-size: 15px;
  margin-right: 13px;
`;

const Summary = styled.Text`
  color: white;
  font-size: 15px;
  margin: 25px 0;
  line-height: 20px;
`;

const CastTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const CastFlatList = styled.FlatList`
  margin: 15px 0;
`;

type CastType = {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
};

type MovieDetailType = {
  title: string;
  year: number;
  rating: number;
  runtime: number;
  like_count: number;
  description_full: string;
  large_cover_image: string;
  cast: CastType[];
};

const CastImage = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 50px;
  margin-right: 22px;
`;

type NavigationProp = NativeStackNavigationProp<DetailNaviParamList, 'Detail'>;
type MovieDetailRouteProp = RouteProp<DetailNaviParamList, 'DetailProp'>;

interface IProps {
  navigation: NavigationProp;
  route: MovieDetailRouteProp;
  // route: { params: { imdb_code: string } };
}

const MovieDetail: React.FC<IProps> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetailType>();

  const { imdb_code } = route.params;

  const getMovieDetail = async () => {
    setIsLoading(true);
    const detail = await movieDetailAPI(imdb_code).then(
      res => res.data.data.movie,
    );

    const movieDetailObj = {
      title: detail.title,
      year: detail.year,
      rating: detail.rating,
      runtime: detail.runtime,
      like_count: detail.like_count,
      description_full: detail.description_full,
      large_cover_image: detail.large_cover_image,
      cast: detail.cast,
    };
    setMovieDetail(movieDetailObj);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Text>{''}</Text>
      ) : (
        <ScrollView>
          <ImageWrapper>
            <MainImage
              // resizeMethod="resize"
              resizeMode="cover"
              source={{ uri: movieDetail?.large_cover_image }}
            />
          </ImageWrapper>
          <Article>
            <MovieTitle>{movieDetail?.title}</MovieTitle>
            <Description>
              <Backgorund />
              <Text>{movieDetail?.rating}/10</Text>
              <Text>{movieDetail?.year}</Text>
              <Text>{movieDetail?.runtime} min</Text>
              <Text>
                {movieDetail?.like_count
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                liked
              </Text>
            </Description>
            <Summary>{movieDetail?.description_full}</Summary>
            <CastTitle>Cast</CastTitle>
            <CastFlatList
              horizontal
              data={movieDetail?.cast}
              renderItem={({ item }: any) => (
                <CastImage source={{ uri: item.url_small_image }} />
              )}
            />
          </Article>
        </ScrollView>
      )}
    </Container>
  );
};

export default MovieDetail;
