import React, { Component } from 'react';
import TMDbApi from '../services/TMDb-api';
import Spinner from '../components/Spinner/Spinner';

export default class Cast extends Component {
  state = {
    movieCasts: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    TMDbApi.fetchShowMovieCast(this.props.match.params.movieId)
      .then(data => data.cast)
      .then(movieCasts => this.setState({ movieCasts }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
         {this.state.loading && <Spinner />}

        <ul className="cast">
          {this.state.movieCasts.map(cast => (
            <li key={cast.cast_id}>
              {cast.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt={cast.name}
                />
              ) : (
                <img
                  src={`https://memepedia.ru/wp-content/uploads/2017/04/61092-YzljOWQ3ZWQ2YQ.gif`}
                  alt="not found"
                />
              )}
              <span>{cast.name}</span>
              <span><b>Character:</b> {cast.character}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
