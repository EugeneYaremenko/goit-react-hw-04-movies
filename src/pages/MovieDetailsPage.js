import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import TMDbApi from '../services/TMDb-api';
import routes from '../routes';
import Cast from '../pages/Cast';
import Reviews from '../pages/Reviews';
import styles from '../components/Navigation/Navigation.module.css';

export default class MovieDetailsPage extends Component {
  state = {
    showMovie: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    TMDbApi.fetchShowMovieDetails(this.props.match.params.movieId)
      .then(showMovie => this.setState({ showMovie }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.moviesPage);
  };

  render() {
    return (
      <div>
        <button className="Button" onClick={this.handleGoBack} type="button">
          Go back
        </button>

        {this.state.loading && <Spinner />}

        {this.state.showMovie && (
          <div className="details">
            {this.state.showMovie.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${this.state.showMovie.backdrop_path}`}
                alt={this.state.showMovie.title}
              />
            ) : (
              <img
                src={`https://memepedia.ru/wp-content/uploads/2017/04/61092-YzljOWQ3ZWQ2YQ.gif`}
                alt="not found"
              />
            )}
            <div className="details-info">
              <h3>
                {this.state.showMovie.title
                  ? `${
                      this.state.showMovie.title
                    } (${this.state.showMovie.release_date.substr(0, 4)})`
                  : `${this.state.showMovie.status_message}`}
              </h3>

              <span>
                User Score:
                {this.state.showMovie.vote_average
                  ? Math.round((this.state.showMovie.vote_average / 10) * 100)
                  : 0}
                %
              </span>

              <p>
                <span>
                  <b>Overviev</b>
                </span>
                <br />
                {this.state.showMovie.overview
                  ? this.state.showMovie.overview
                  : 'No Overviev'}
              </p>

              <p>
                <span>
                  <b>Genres</b>
                </span>
                <br />
                {this.state.showMovie.genres
                  ? this.state.showMovie.genres.map(genres => (
                      <span>{genres.name} </span>
                    ))
                  : 'No Genres'}
              </p>
            </div>
          </div>
        )}

        <h3>Additional information</h3>
        <div className={styles.navigation}>
          <ul>
            <li>
              <Link to={`${this.props.match.url}/cast`}>Cast</Link>
            </li>

            <li>
              <Link to={`${this.props.match.url}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </div>
        <hr />

        <Route path={`${this.props.match.path}/cast`} component={Cast} />
        <Route path={`${this.props.match.path}/reviews`} component={Reviews} />
      </div>
    );
  }
}
