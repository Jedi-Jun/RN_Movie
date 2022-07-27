type MovieType = {
  id: number;
  title: string;
  year: number;
  rating: number;
  medium_cover_image: string;
  large_cover_image: string;
  imdb_code: string;
};

type LoginNaviParamList = {
  Login: undefined; // No parameters to open the screen of 'Login'
};

type HomeNaviParamList = {
  Home: undefined;
};

type DetailNaviParamList = {
  Detail: undefined;
  DetailProp: {
    imdb_code: any;
  };
};
