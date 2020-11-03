const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'fe730bdaf0ffcbff87ea66f5b23cfe3c';

const fetchShowTrending = () => {
  return fetch(`${baseUrl}/trending/all/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(trendings => trendings.results);
};

const fetchShowSearchMovies = searchQuery => {
  return fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
  )
    .then(response => response.json())
    .then(movies => movies.results);
};

const fetchShowMovieDetails = movieId => {
  return fetch(
    `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`,
  ).then(response => response.json());
};

const fetchShowMovieCast = movieId => {
  return fetch(
    `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`,
  ).then(response => response.json());
};

const fetchShowMovieReviews = movieId => {
  return fetch(
    `${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
  ).then(response => response.json());
};

export default {
  fetchShowTrending,
  fetchShowSearchMovies,
  fetchShowMovieDetails,
  fetchShowMovieCast,
  fetchShowMovieReviews,
};
