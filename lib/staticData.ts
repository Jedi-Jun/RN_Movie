export const BigMovieData = [
  {
    id: 1,
    imdb_code: 'tt4154756',
    title: 'avengers infinity war',
    year: '2018',
    genres: ['action', 'adventure', 'drama', 'fantasy', 'sci-fi'],
    url: 'https://img.yts.mx/assets/images/movies/avengers_infinity_war_2018/large-cover.jpg',
  },
  {
    id: 2,
    imdb_code: 'tt1825683',
    title: 'black panther',
    year: '2018',
    genres: ['action', 'adventure', 'sci-fi'],
    url: 'https://img.yts.mx/assets/images/movies/black_panther_2018/large-cover.jpg',
  },
  {
    id: 3,
    imdb_code: 'tt4154796',
    title: 'avengers endgame',
    year: '2019',
    genres: ['action', 'adventure', 'drama', 'sci-fi'],
    url: 'https://yts.mx/assets/images/movies/avengers_endgame_2019/large-cover.jpg',
  },
  {
    id: 4,
    imdb_code: 'tt1211837',
    title: 'doctor strange',
    year: '2016',
    genres: ['action', 'adventure', 'fantasy', 'sci-fi'],
    url: 'https://yts.mx/assets/images/movies/doctor_strange_2016/large-cover.jpg',
  },
  {
    id: 5,
    imdb_code: 'tt9419884',
    title: 'doctor strange in the multiverse of madness',
    year: '2022',
    genres: ['action', 'adventure', 'fantasy', 'horror', 'sci-fi'],
    url: 'https://yts.mx/assets/images/movies/doctor_strange_in_the_multiverse_of_madness_2022/large-cover.jpg',
  },
];

export const subMovieData = [
  {
    id: 1,
    sectionTitle: 'latest movies',
    query: '/list_movies.json?quality=1080p&sort_by=date_added&limit=30',
  },
  {
    id: 2,
    sectionTitle: 'top rated movies',
    query: '/list_movies.json?quality=1080p&sort_by=rating&limit=30',
  },
  {
    id: 3,
    sectionTitle: 'most downloaded movies',
    query: '/list_movies.json?quality=1080p&sort_by=download_count&limit=30',
  },
];
